/**
 * Created by zzy on 3/6/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var entSchema = new Schema({
    name: {type: 'String', unique: true},                       //企业名称
    contactName: String,                                        //企业联系人
    contactEmail: String,                                       //企业联系人邮箱
    contactPhone: String,                                       //企业联系人手机号
    proCode: String,                                            //企业英文代码
    remark: String,                                             //企业备注
    isEnable: Boolean,                                          //企业状态
    type: Number,                                               //企业类型 1 分销商 2 供应商
    balanceType: String,                                        //结算方式
    returnType: String,                                         //返佣方式
    createTime: {type: Number, default: Date.now},              //创建时间
    updateTime: Number,                                         //最后更新日期
    operator:{'type':Schema.Types.ObjectId,'ref':'Member'}      //操作员
});

var Ent = db.mongoose.model("Ent", entSchema);

module.exports = Ent;