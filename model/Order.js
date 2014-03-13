/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var orderSchema = new Schema({
    orderID: String,
    memberID: Schema.Types.ObjectId,
    orderDate: Number,
    startDate: Number,
    source: String,
    payWay: String,
    quantity: Number,
    remark: String,
    productID: Schema.Types.ObjectId,
    totalPrice: Number,
    subOrder: [Schema.Types.ObjectId]
});

var Order = db.mongoose.model("Order", orderSchema);

module.exports = Order;