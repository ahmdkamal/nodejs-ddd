let Gateway = require('../entities/gateway.entity');
let _GenericModel = require('../../../shared/model');

module.exports = ({GenericModel = _GenericModel}) => {
    class GatewayRepository extends GenericModel{
        constructor(Gateway) {
            super(Gateway);
        }
    }

    return new GatewayRepository(Gateway);
}