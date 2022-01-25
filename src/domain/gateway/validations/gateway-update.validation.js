const { body } = require('express-validator/check')

module.exports = () => {
    return [
        body('serialNumber').optional().isString().trim(),
        body('name').optional().isString().trim(),
        body('ipAddress').optional().matches('^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$').withMessage('Must be a valid IP Address'),
    ];
}