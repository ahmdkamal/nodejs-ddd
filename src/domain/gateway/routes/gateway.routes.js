const express = require('express');

const Router = express.Router();

const GatewayController = require('../controllers/gateway.controllers');
const gatewayStoreValidation = require('../validations/gateway-store.validation');
const gatewayUpdateValidation = require('../validations/gateway-update.validation');

Router.get('/', GatewayController.index);
Router.post('/', gatewayStoreValidation() , GatewayController.store);
Router.get('/:id', GatewayController.getOne);
Router.put('/:id', gatewayUpdateValidation(), GatewayController.updateOne);
Router.delete('/:id', GatewayController.deleteOne);

module.exports = Router;