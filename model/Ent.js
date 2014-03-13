/**
 * Created by zzy on 3/6/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var entSchema = new Schema({
    name: {type: 'String', unique: true},
    contactName: String,
    contactEmail: String,
    contactPhone: String,
    proCode: String,
    remark: String,
    isEnable: Boolean,
    type: Number,
    balanceType: String,
    returnType: String,
    createTime: {type: Number, default: Date.now},
    updateTime: Number,
    operatorID: Schema.Types.ObjectId
});

var Ent = db.mongoose.model("Ent", entSchema);

module.exports = Ent;