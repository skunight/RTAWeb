/**
 * Created by zzy on 3/3/14.
 */
var db = require('./../tools/db');
var Module = require('./../model/Module');
var mongoose = db.mongoose;
var module = new Module({
    code:'123',
    name:'456',
    isEnable:true,
    updateTime:Date.now(),
    operator:'53180dea206f81532121c761'
});


module.save(function(err,res){
    console.log(err,res);
});
