let mongoose = require('mongoose');
const dateFormat = require("../../../shared/date");
const mongoosePaginate = require("mongoose-paginate-v2");
let Schema = mongoose.Schema;
let Gateway = require('./gateway.entity');

let deviceSchema = new Schema({
    uid: {type: Number, required: true},
    vendor: {type: String, required: true},
    createdAt: {type: Date, required: true},
    status: {type: Boolean, required: true},
    gateway: {type: Schema.Types.ObjectId, ref: 'Gateway'}
});


deviceSchema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    object.createdAt = dateFormat.toDate(object.createdAt);

    if (typeof object.gateway === 'object') {
        const {_id, ...gateway} = object.gateway;
        gateway.id = _id;
        object.gateway = gateway;
    }

    return object;
});

deviceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Device', deviceSchema);
