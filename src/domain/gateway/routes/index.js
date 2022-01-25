const express = require('express');

const gatewayRouters = require('./gateway.routes');
const deviceRouters = require('./device.routes');

const Router = express.Router();

Router.use('/', gatewayRouters);
Router.use('/', deviceRouters);

module.exports = Router;