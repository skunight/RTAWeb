/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var priceSchema = new Schema({
    product:{'type':Schema.Types.ObjectId,'ref':'Product'},             //产品ID
    date:Number,
    cost: Number,                                                       //产品底价
    price: Number,                                                      //产品卖价
    marketPrice: Number,                                                //产品市场价
    packagePrice: Number,                                               //打包价
    inventory: Number,                                                  //产品库存
    provider: {'type':Schema.Types.ObjectId,'ref':'Ent'},               //产品供应商
    operator: Schema.Types.ObjectId,                                    //操作员
    inventoryID: {'type':Schema.Types.ObjectId,'ref':'Inventory'},      //大库存ID
    createTime: { type: Number, default: Date.now },                    //创建时间
    updateTime: Number                                                  //最后更新日期
});

var Price = db.mongoose.model("Price", priceSchema);

module.exports = Price;
