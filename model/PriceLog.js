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
    inventoryType: Number,
    weekend: [Number],
    status: String,
    createTime: Number,
    provider: Schema.Types.ObjectId,
    operator: Schema.Types.ObjectId,
    auditor: Schema.Types.ObjectId,
    auditorTime:Number
});

var PriceLog = db.mongoose.model("PriceLog", priceLogSchema);

module.exports = PriceLog;