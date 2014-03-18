/**
 * Created by zzy on 3/6/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var privSchema = new Schema({
    member: {type:Schema.Types.ObjectId,ref:'Member'},      //会员ID
    module: {type:Schema.Types.ObjectId,ref:'Module'},      //模块ID
    isEnable: Boolean,                                      //权限状态
    createTime: { type: Number, default: Date.now },        //创建时间
    updateTime: Number,                                     //最后更新日期
    operator: {type:Schema.Types.ObjectId,ref:'Member'}     //操作员
});

var Priv = db.mongoose.model("Pro.Priv", privSchema);

module.exports = Priv;
Date.now().getTime()