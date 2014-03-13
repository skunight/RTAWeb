/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var subOrderSchema = new Schema({
    productID: Schema.Types.ObjectId,
    quantity: Number,
    price: Number,
    status: String
});

var SubOrder = db.mongoose.model("SubOrder", subOrderSchema);

module.exports = SubOrder;