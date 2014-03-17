/**
 * Created by zzy on 3/14/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;

var citySchema = new Schema({
    'name': String,
    'pinyin': String,
    'firstLetter': String,
    'isEnable': Boolean,
    'province': {'type':Schema.Types.ObjectId,'ref':'Province'},
    'image':[{'url':String,'intro':String}],
    'order':Number

});

var City = db.mongoose.model("City", citySchema);

module.exports = City;