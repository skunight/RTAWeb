/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var inventorySchema = new Schema({
    inventory: Number,          //库存
    startDate: Number,          //库存开始时间
    endDate: Number             //库存结束时间
});

var Inventory = db.mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;

/*
 关于库存
 大库存	用户录入大库存时，价格表中记录库存为1，大库存id为对应的大库存表中的id，
 如果用户再次录入大库存的时候，录入的时间段中在价格表中对应的库存中有为1的数据，则表示用户录入的时间段与之前的录入有交叉，此时报错，不允许录入。
 如果用户禁用原始录入的大库存。
 */