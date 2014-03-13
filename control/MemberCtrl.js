/**
 * Created by zzy on 3/10/14.
 */
var MemberCtrl = function(){};
var Member = require('./../model/Member');
var Ent = require('./../model/Ent');

MemberCtrl.create = function(obj,fn){
    var member = new Member(obj);
    member.save(fn);
};

MemberCtrl.update = function(id,obj,fn){
    obj.updateTime=Date.now();
    Member.findByIdAndUpdate(id,{$set:obj},fn);
};

MemberCtrl.list = function(page,pageSize,mobile,name,email,providerID,isEnable,fn){
    var query = Member.find();
    query.select('mobile name passwd email tel gender signUpDate provider isEnable');
    if(mobile){
        query.where({mobile:new RegExp(mobile)});
    }
    if(name){
        query.where({name:new RegExp(name)});
    }
    if(email){
        query.where({email:new RegExp(email)});
    }
    if(providerID){
        query.where({providerID:providerID});
    }
    if(isEnable){
        query.where({isEnable:isEnable});
    }
    query.skip(page*pageSize);
    query.limit(pageSize);
    query.populate({path:'provider',select:'name'});
    query.exec(fn);
};

MemberCtrl.detail = function(id,fn){
    Member.findById(id)
          .populate({path:'provider',select:'name'})
          .populate({path:'operator',select:'name'})
          .exec(fn);
};

module.exports = MemberCtrl;