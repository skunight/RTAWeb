/**
 * Created by zzy on 3/3/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var memberSchema = new Schema({
    mobile: {type: 'String', unique: true},
    name: String,
    passwd: String,
    email: String,
    gender: String,
    birthYear:String,
    favouriteCity:String,
    lastDestCity:String,
    lisencePlate:String,
    intentCity:String,
    idCard: String,
    postAddr: String,
    signUpDate: { type: Number, default: Date.now },
    provider: {type:Schema.Types.ObjectId,ref:'Ent'},
    operator: {type:Schema.Types.ObjectId,ref:'Member'},
    isEnable: Boolean
});

var Member = db.mongoose.model("Member", memberSchema);

module.exports = Member;