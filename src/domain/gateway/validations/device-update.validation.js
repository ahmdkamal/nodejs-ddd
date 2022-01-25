const { body } = require('express-validator/check')

module.exports = () => {
    return [
        body('uid').optional().isNumeric().trim(),
        body('vendor').optional().isString().trim(),
        body('createdAt').optional().trim().isDate(),
        body('status').optional().isBoolean(),
    ];
}