let Device = require('../entities/device.entity');
let pagination = require('../../../shared/pagination');
const gatewayCreator = require("../services/gateway.service");
const DuplicatedEntry = require("../../../shared/errors/DuplicatedEntry");
const EntryNotExist = require("../../../shared/errors/EntryNotExist");

let deviceRepositoryMaker = require('../repositories/device.reposioty');
let deviceRepository = deviceRepositoryMaker({})

const _gatewayService = gatewayCreator({
    DuplicatedEntry,
    EntryNotExist
})

module.exports = ({MaxCapacity, gatewayService = _gatewayService}) => {
    class DeviceService {

        constructor() {
            this.repo = deviceRepository;
        }

        async index(req, serialNumber) {
            let gateway = await gatewayService.throwIfNotExists(serialNumber)
            let paginationParam = pagination(req);
            let param = {query: {"gateway": gateway.id}, populate: [{path: 'gateway', select: '_id serialNumber ipAddress'}]}

            return await this.repo.getMany({...param, ...paginationParam});
        }

        async save(req, gatewayParam) {
            let gateway = await gatewayService.throwIfNotExists(gatewayParam, 'Gateway')
console.log(gateway)
            await this.throwIfExceededLimits(gatewayParam)

            let device = Device({
                uid: req.uid,
                vendor: req.vendor,
                createdAt: req.createdAt,
                status: req.status,
                gateway: gateway.id,
            })

            return await this.repo.save(device);
        }

        async getOne(param) {
            const query = {query: {param} , populate: [{path: 'gateway', select: '_id serialNumber ipAddress'}]}
            return await this.repo.getOne(query);
        }

        async updateOne(param, body) {
            let device = await this.throwIfNotExists(param, 'device');

            if (body.uid !== null && body.uid !== device.uid) {
                device.uid = body.uid;
            }

            if (body.vendor !== null && body.vendor !== device.vendor) {
                device.vendor = body.vendor;
            }

            if (body.createdAt !== null && body.createdAt !== device.createdAt) {
                device.createdAt = body.createdAt;
            }

            if (body.status !== null && body.status !== device.status) {
                device.status = body.status;
            }

            return await this.repo.update({
                modelSchema: device,
                filter: param,
                populate: [{path: 'gateway', select: '_id serialNumber ipAddress'}]
            });
        }

        async deleteOne(param) {
            let device = await this.throwIfNotExists(param, 'device');
            await this.repo.delete(device);
        }


        // Helpers
        async throwIfExceededLimits(param) {
            let count = await this.repo.count(param);

            if (count === 10) {
                throw new MaxCapacity('Devices', 10);
            }
        }

        async throwIfNotExists(param, name = '') {
            let existOrNot = await this.getOne(param);

            if (existOrNot === null) {
                throw new EntryNotExist(name);
            }

            return existOrNot;
        }
    }

    return new DeviceService();
}