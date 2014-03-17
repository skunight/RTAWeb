/**
 * Created by zzy on 3/10/14.
 */
var ProviderCtrl = function(){};
var Ent = require('./../model/Ent');

ProviderCtrl.create = function(obj,fn){
    obj.type=2;
    var ent = new Ent(obj);
    ent.save(fn);
};

ProviderCtrl.update = function(id,obj,fn){
    obj.updateTime=Date.now();
    Ent.findByIdAndUpdate(id,{$set:obj},fn);
};

ProviderCtrl.list = function(page,pageSize,fn){
    Ent.find()
       .where({type:2})
       .select('name contactName contactEmail contactPhone proCode isEnable createTime')
       .skip(page*pageSize)
       .limit(pageSize)
       .exec(fn);
};

ProviderCtrl.detail = function(id,fn){
    Ent.findById(id);
};

ProviderCtrl.shortList = function(fn){
    Ent.find()
        .select('name')
        .exec(fn);
};


module.exports = ProviderCtrl;