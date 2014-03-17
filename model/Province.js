/**
 * Created by zzy on 3/14/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;

var provinceSchema = new Schema({
    'name': String,
    'isEnable': Boolean
});

var Province = db.mongoose.model("Province", provinceSchema);

module.exports = Province;