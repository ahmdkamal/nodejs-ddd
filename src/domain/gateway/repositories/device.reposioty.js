let Device = require('../entities/device.entity');
let _GenericModel = require('../../../shared/model');

module.exports = ({GenericModel = _GenericModel}) => {
    class DeviceRepository extends GenericModel{
        constructor(Device) {
            super(Device);
        }
    }

    return new DeviceRepository(Device);
}