const response = require('../../../shared/response');
const serviceCreator = require('../services/gateway.service');
const {validationResult} = require('express-validator');
const DuplicatedEntry = require('../../../shared/errors/DuplicatedEntry');
const EntryNotExist = require('../../../shared/errors/EntryNotExist');

const service = serviceCreator({
    DuplicatedEntry,
    EntryNotExist
})

module.exports = class GatewayControllers {
    static async index(req, res, next) {
        try {
            let gateways = await service.index(req);
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

            let gateway = await service.save(req.body);

            return response.success(res, {status: 201, data: gateway, message: "Success"});
        } catch (e) {
            return response.failed(res, next, {status: e.status, message: e.message, errors: e.errors || []});
        }
    }

    static async getOne(req, res, next) {
        try {
            let gateways = await service.getOne({"_id": req.params.id});
            return response.success(res, {status: 200, data: gateways});
        } catch (e) {
            return response.failed(res, next, {status: e.status, message: e.message});
        }
    }

    static async updateOne(req, res, next) {
        try {
            let gateway = await service.updateOne({"_id": req.params.id}, req.body);
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