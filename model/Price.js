/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var priceSchema = new Schema({
    product:{'type':Schema.Types.ObjectId,'ref':'Product'},
    cost: Number,
    price: Number,
    marketPrice: Number,
    packagePrice: Number,
    inventory: Number,
    provider: {'type':Schema.Types.ObjectId,'ref':'Ent'},
    operator: Schema.Types.ObjectId,
    inventoryID: {'type':Schema.Types.ObjectId,'ref':'Inventory'},
    createTime: { type: Number, default: Date.now },
    updateTime: Number
});

var Price = db.mongoose.model("Price", priceSchema);

module.exports = Price;