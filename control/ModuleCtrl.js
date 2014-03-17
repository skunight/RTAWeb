/**
 * Created by zzy on 3/14/14.
 */
var ModuleCtrl = function(){};
var Module = require('./../model/Module');
ModuleCtrl.list = function(fn){
    Module.find()
        .where({'isEnable':true})
        .select('code name cat')
        .sort({'order':1})
        .exec(fn);
};

module.exports = ModuleCtrl;