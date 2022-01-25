const express = require('express');

const Router = express.Router();

const DeviceController = require('../controllers/device.controllers');
const deviceStoreValidation = require('../validations/device-store.validation');
const deviceUpdateValidation = require('../validations/device-update.validation');

Router.get('/:gateway/devices', DeviceController.index);
Router.post('/:gateway/devices', deviceStoreValidation() , DeviceController.store);
Router.get('/:gateway/devices/:device', DeviceController.getOne);
Router.put('/:gateway/devices/:device', deviceUpdateValidation(), DeviceController.updateOne);
Router.delete('/:gateway/devices/:device', DeviceController.deleteOne);

module.exports = Router;