/**
 * Created by zzy on 3/14/14.
 */
var ModuleCtrl = function(){};
var Module = require('./../model/Module');
ModuleCtrl.list = function(fn){
    Module.find(fn);
};