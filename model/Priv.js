/**
 * Created by zzy on 3/6/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var privSchema = new Schema({
    memberID: Schema.Types.ObjectId,
    moduleID: Schema.Types.ObjectId,
    isEnable: Boolean,
    createTime: { type: Number, default: Date.now },
    updateTime: Number,
    operator: Schema.Types.ObjectId
});

var Priv = db.mongoose.model("Pro.Priv", privSchema);

module.exports = Priv;
Date.now().getTime()