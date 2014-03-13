/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var productSchema = new Schema({
    relatedProductID: [],
    /*"[[[ObjectID('283shs73hs32he2h232323'),2],[ObjectID('283shs73hs32he2h232323'),1]]
     ,[[ObjectID('283shs73hs32he2h232323'),2],[ObjectID('283shs73hs32he2h232323'),1]]
     ,[[ObjectID('283shs73hs32he2h232323'),2],[ObjectID('283shs73hs32he2h232323'),1]]]"*/
    name: String,
    content: String,
    intro: String,
    image: [
        {url: String, intro: String}
    ],
    city: Schema.Types.ObjectId,
    addr: String,
    gps: {lat: Number, lon: Number},
    level: Number,
    openTime: String,
    bookRule: String,
    useRule: String,
    cancelRule: String,
    transportation: String,
    effectDate: Number,
    expiryDate: Number,
    isEnable: Boolean,
    contactName: String,
    tel: String,
    fax: String,
    type: Number,
    subType: String,
    operator: Schema.Types.ObjectId,
    createTime: {type: Number, default: Date.now},
    updateTime: Number
});

var Product = db.mongoose.model("Product", productSchema);

module.exports = Product;