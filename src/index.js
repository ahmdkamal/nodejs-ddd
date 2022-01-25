const express = require('express');

const app = express();

const dbConfig = require('./db');
const routesConfig = require('./routes');

module.exports = async () => {
    await dbConfig.connect();
    await routesConfig(app);

    return app;
};
