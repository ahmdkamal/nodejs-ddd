const gatewayRouter = require('../domain/gateway').Router;
const express = require('express');

module.exports = app => {
    app.use(express.json());

    app.use('/api/v1/gateways', gatewayRouter);

    return app;
}