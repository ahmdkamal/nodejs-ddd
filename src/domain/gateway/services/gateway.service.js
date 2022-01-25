let Gateway = require('../entities/gateway.entity');
let pagination = require('../../../shared/pagination');

const gatewayRepositoryMaker = require("../repositories/gateway.reposioty");
let gatewayRepository = gatewayRepositoryMaker({})

module.exports = ({DuplicatedEntry, EntryNotExist}) => {
    class GatewayService {

        constructor() {
            this.repo = gatewayRepository;
        }

        async index(req) {
            return await this.repo.getMany(pagination(req));
        }

        async save(req) {
            await this.throwIfExists({serialNumber: req.serialNumber}, 'gateway');

            let gatewaySchema = Gateway({
                serialNumber: req.serialNumber,
                name: req.name,
                ipAddress: req.ipAddress,
            })

            return await this.repo.save(gatewaySchema);
        }

        async getOne(param) {
            return await this.repo.getOne({query: param});
        }

        async updateOne(param, body) {
            let gateway = await this.throwIfNotExists(param, 'gateway');

            if (body.serialNumber !== null && body.serialNumber !== gateway.serialNumber) {
                await this.throwIfExists({serialNumber: body.serialNumber}, 'gateway');
                gateway.serialNumber = body.serialNumber;
            }

            if (body.name !== null && body.name !== gateway.name) {
                gateway.name = body.name;
            }

            if (body.ipAddress !== null && body.ipAddress !== gateway.ipAddress) {
                gateway.ipAddress = body.ipAddress;
            }

            return await this.repo.update({
                modelSchema: gateway, filter: param
            });
        }

        async deleteOne(param) {
            let gateway = await this.throwIfNotExists(param, 'gateway');
            await this.repo.delete(gateway);
        }


        // Helpers
        async throwIfExists(param, name = '') {
            let existOrNot = await this.getOne(param);

            if (existOrNot) {
                throw new DuplicatedEntry(name);
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

    return new GatewayService();
}