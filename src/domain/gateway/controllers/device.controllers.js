const response = require('../../../shared/response');
const serviceCreator = require('../services/device.service');
const {validationResult} = require('express-validator');
const MaxCapacity = require('../../../shared/errors/MaxCapacity');

const service = serviceCreator({
    MaxCapacity
})

module.exports = class DeviceControllers {
    static async index(req, res, next) {
        try {
            let gateways = await service.index(req, {"_id": req.params.gateway});
            return response.success(res, {status: 200, data: gateways.data, pagination: gateways.pagination});
        } catch (e) {
            return response.failed(res, next, {status: e.status, message: e.message});
        }
    }

    static async store(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return response.failed(res, next, {status: 422, message: 'Validation Error', errors: errors.array()})
            }

            let gateway = await service.save(req.body, {"_id": req.params.gateway});

            return response.success(res, {status: 201, data: gateway, message: "Success"});
        } catch (e) {
            return response.failed(res, next, {status: e.status, message: e.message, errors: e.errors || []});
        }
    }

    static async getOne(req, res, next) {
        try {
            let gateways = await service.getOne({"gateway": req.params.gateway, "_id": req.params.device});
            return response.success(res, {status: 200, data: gateways});
        } catch (e) {
            return response.failed(res, next, {status: e.status, message: e.message});
        }
    }

    static async updateOne(req, res, next) {
        try {
            let gateway = await service.updateOne({"gateway": req.params.gateway, "_id": req.params.device}, req.body);
            return response.success(res, {status: 200, data: gateway});
        } catch (e) {
            return response.failed(res, next, {status: e.status, message: e.message, errors: e.errors || []});
        }
    }


    static async deleteOne(req, res, next) {
        try {
            await service.deleteOne({"_id": req.params.id});
            return response.success(res, {status: 204, data: []});
        } catch (e) {
            return response.failed(res, next, {status: e.status, message: e.message, errors: e.errors || []});
        }
    }
}