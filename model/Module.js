/**
 * Created by zzy on 3/6/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var moduleSchema = new Schema({
    code: String,                                               //模块Code
    name: String,                                               //模块功能描述
    cat:String,                                                 //模块分类
    isEnable: Boolean,                                          //模块状态
    createTime: {type: Number, default: Date.now},              //创建时间
    updateTime: Number,                                         //最后更新日期
    order:Number,                                               //排序值
    operator: {'type':Schema.Types.ObjectId,'ref':'Member'}     //操作员
});

var Module = db.mongoose.model("Pro.Module", moduleSchema);

module.exports = Module;