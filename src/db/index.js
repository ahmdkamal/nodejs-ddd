const mongoose = require('mongoose');

module.exports = {
    connect: async () => {
        const config = {useNewUrlParser: true}
        const {DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD} = process.env;

        const authenticated = DB_USERNAME && DB_PASSWORD
        const url = authenticated
            ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`
            : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
        mongoose.connect(url, config, err => {
            if (err) {
                throw err;
            }
            console.log(`Connected to ${url}...`);
        });

        if (process.env.NODE_ENV === 'local') {
            mongoose.set('debug', true);
        }
    }
};
