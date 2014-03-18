/**
 * Created by zzy on 3/7/14.
 */
var Price = require('./Price');
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var subOrderSchema = new Schema({
    product: {'type':Schema.Types.ObjectId,'ref':'Product'},        //产品ID
    quantity: Number,                                               //产品数量
    price: Price,                                                   //价格对象
    status: String                                                  //子订单状态
});

var SubOrder = db.mongoose.model("SubOrder", subOrderSchema);

module.exports = SubOrder;