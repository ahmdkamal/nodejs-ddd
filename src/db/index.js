const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        return new Promise((resolve, reject) => {
            const config = {useNewUrlParser: true}
            const {DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD} = process.env;
            const authenticated = DB_USERNAME && DB_PASSWORD
            const url = authenticated
                ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`
                : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

            if (process.env.NODE_ENV === 'test') {
                const Mockgoose = require('mockgoose').Mockgoose;
                const mockgoose = new Mockgoose(mongoose);
                mockgoose.prepareStorage()
                    .then(() => {
                        mongoose.connect(url, config, err => {
                            if (err) {
                                reject(err);
                            }
                            console.log(`Connected to ${url}...`);
                            resolve();
                        });
                    })

            } else {
                mongoose.connect(url, config, err => {
                    if (err) {
                        reject(err);
                    }
                    console.log(`Connected to ${url}...`);
                    resolve();
                });

                if (process.env.NODE_ENV === 'local') {
                    mongoose.set('debug', true);
                }
            }
        })
    },
    close: () => {
        return new Promise((resolve, reject) => {
            mongoose.disconnect(error => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        })
    }
};
