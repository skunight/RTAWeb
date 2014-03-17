/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var priceLogSchema = new Schema({
    product:{type:Schema.Types.ObjectId,ref:'Product'},
    startDate: Number,
    endDate: Number,
    cost: Number,
    costWeekend: Number,
    price: Number,
    priceWeekend: Number,
    marketPrice: Number,
    marketPriceWeekend: Number,
    packagePrice: Number,
    packagePriceWeekend: Number,
    inventory: Number,
    inventoryWeekend: Number,
    inventoryType: Number,
    weekend: [Number],
    status: String,
    createTime: Number,
    provider: {type:Schema.Types.ObjectId,ref:'Ent'},
    operator: {type:Schema.Types.ObjectId,ref:'Member'},
    auditor: {type:Schema.Types.ObjectId,ref:'Member'},
    auditorTime:Number
});

var PriceLog = db.mongoose.model("PriceLog", priceLogSchema);

module.exports = PriceLog;