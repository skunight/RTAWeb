/**
 * Created by zzy on 3/10/14.
 */
var ProviderCtrl = function(){};
var Ent = require('./../model/Ent');

ProviderCtrl.create = function(obj,fn){
    obj.type=2;//1 分销商 2 供应商
    var ent = new Ent(obj);
    ent.save(fn);
};

ProviderCtrl.update = function(id,obj,fn){
    obj.updateTime=Date.now();
    Ent.findByIdAndUpdate(id,{$set:obj},fn);
};

ProviderCtrl.list = function(page,pageSize,fn){
    var async = require('async');
    async.series([
        function(cb){
            Ent.find()
                .where({type:2})//1 分销商 2 供应商
                .select('name contactName contactEmail contactPhone proCode isEnable createTime')
                .skip(page*pageSize)
                .limit(pageSize)
                .exec(cb);
        },function(cb){
            Ent.count()
                .where({type:2})//1 分销商 2 供应商
                .exec(cb);
        }
    ],fn);
};

ProviderCtrl.detail = function(id,fn){
    Ent.findById(id)
        .populate({path:'operator',select:'name'})
        .exec(fn);
};

ProviderCtrl.shortList = function(fn){
    Ent.find()
        .select('name')
        .exec(fn);
};


module.exports = ProviderCtrl;