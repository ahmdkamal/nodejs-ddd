const { body } = require('express-validator/check')

module.exports = () => {
    return [
        body('uid').exists().bail().isNumeric().trim(),
        body('vendor').exists().bail().isString().trim(),
        body('createdAt').exists().bail().trim().isDate(),
        body('status').exists().isBoolean(),
    ];
}