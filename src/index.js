const express = require('express');

const app = express();

const dbConfig = require('./db');
const routesConfig = require('./routes');

module.exports = async () => {
    // Wait until the DB is connected and publish the routes
    dbConfig.connect().then(async () => {
        await routesConfig(app);
    });

    return app;
};
