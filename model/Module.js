/**
 * Created by zzy on 3/6/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var moduleSchema = new Schema({
    code: String,
    name: String,
    isEnable: Boolean,
    createTime: {type: Number, default: Date.now},
    updateTime: Number,
    order:Number,
    operator: {'type':Schema.Types.ObjectId,'ref':'Member'}
});

var Module = db.mongoose.model("Pro.Module", moduleSchema);

module.exports = Module;