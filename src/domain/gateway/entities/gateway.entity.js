let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const dateFormat = require('../../../shared/date');

let gatewaySchema = new Schema({
    serialNumber: {type: String, unique: true},
    name: {type: String, required: true},
    ipAddress: {type: String, required: true},
    devices: [{type: Schema.Types.ObjectId, ref: 'Device'}]
}, {
    timestamps: true,
    autoIndex: true
});

gatewaySchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object.createdAt = dateFormat.toDateTime(object.createdAt);
    object.updatedAt = dateFormat.toDateTime(object.updatedAt);
    return object;
});

gatewaySchema.plugin(mongoosePaginate);

gatewaySchema = mongoose.model('Gateway', gatewaySchema);

module.exports = gatewaySchema;