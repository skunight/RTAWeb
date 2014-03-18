/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var priceLogSchema = new Schema({
    product:{type:Schema.Types.ObjectId,ref:'Product'},         //产品ID
    startDate: Number,                                          //产品开始售卖日期
    endDate: Number,                                            //产品结束售卖日期
    cost: Number,                                               //产品底价(周中)
    costWeekend: Number,                                        //产品底价(周末)
    price: Number,                                              //产品卖价(周中)
    priceWeekend: Number,                                       //产品卖价(周末)
    marketPrice: Number,                                        //产品市场价(周中)
    marketPriceWeekend: Number,                                 //产品市场价(周末)
    packagePrice: Number,                                       //打包价(周中)
    packagePriceWeekend: Number,                                //打包价(周末)
    inventory: Number,                                          //库存(周中)
    inventoryWeekend: Number,                                   //库存(周末)
    inventoryType: Number,                                      //库存类型 1.大库存 0单天库存
    weekend: [Number],                                          //周末定义 周日为0
    status: Number,                                             //状态 1新录入 2 已通过  0已拒绝 3 已禁用
    createTime: { type: Number, default: Date.now },            //创建时间
    provider: {type:Schema.Types.ObjectId,ref:'Ent'},           //产品供应商
    operator: {type:Schema.Types.ObjectId,ref:'Member'},        //操作员
    auditor: {type:Schema.Types.ObjectId,ref:'Member'},         //审核员
    auditorTime:Number,                                         //审核时间
    productType:Number                                          //产品类型 ticket:1,hotel:2,voture:3,package:4,ticketPackage:5
});

var PriceLog = db.mongoose.model("PriceLog", priceLogSchema);

module.exports = PriceLog;