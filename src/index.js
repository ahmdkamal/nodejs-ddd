const express = require('express');

const app = express();

const dbConfig = require('./db');
const routesConfig = require('./routes');

module.exports = async () => {
    // Wait until the DB is connected and publish the routes
    await dbConfig.connect();
    routesConfig(app);

    return app;
};
