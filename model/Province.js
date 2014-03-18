/**
 * Created by zzy on 3/14/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;

var provinceSchema = new Schema({
    'name': String,         //省份名称
    'isEnable': Boolean     //是否有效
});

var Province = db.mongoose.model("Province", provinceSchema);

module.exports = Province;