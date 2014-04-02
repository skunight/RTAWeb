/**
 * Created by zzy on 3/14/14.
 */
var ModuleCtrl = function () {
};
var Module = require('./../model/Module');
var Priv = require('./../model/Priv');
ModuleCtrl.shortList = function (fn) {
    Module.find()
        .where({'isEnable': true})
        .select('code name cat')
        .sort({'order': 1})
        .exec(fn);
};

ModuleCtrl.privList = function (fn) {
    Priv.find()
        .populate({path: 'member', select: 'name'})
        .populate({path: 'module', select: 'name'})
        .populate({path: 'operator', select: 'name'})
        .exec(fn);
};

ModuleCtrl.privUpdate = function (member, module, isEnable, operator, fn) {
    Priv.findOneAndUpdate(
        {'member': member, 'module': module},
        {'$set': {'member': member, 'module': module, 'isEnable': isEnable, 'operator': operator, 'createTime': Date.now()}},
        {'upsert': true},
        fn);
};

module.exports = ModuleCtrl;