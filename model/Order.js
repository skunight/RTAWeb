/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var orderSchema = new Schema({
    orderID: String,                                            //订单号
    member: {'type':Schema.Types.ObjectId,'ref':'Member'},      //会员编号
    orderDate: Number,                                          //下单日期
    startDate: Number,                                          //出发日期
    source: String,                                             //订单来源
    payWay: String,                                             //付款方式
    quantity: Number,                                           //产品数量
    remark: String,                                             //订单备注
    product: {'type':Schema.Types.ObjectId,'ref':'Product'},    //产品ID
    totalPrice: Number,                                         //产品总金额
    subOrder: [{'type':Schema.Types.ObjectId,'ref':'Product'}]  //子订单
});

var Order = db.mongoose.model("Order", orderSchema);

module.exports = Order;