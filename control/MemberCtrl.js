/**
 * Created by zzy on 3/10/14.
 */
var MemberCtrl = function(){};
var Member = require('./../model/Member');
var Ent = require('./../model/Ent');
var async = require('async');

MemberCtrl.create = function(obj,fn){
    var member = new Member(obj);
    member.save(fn);
};

MemberCtrl.update = function(id,obj,fn){
    obj.updateTime=Date.now();
    Member.findByIdAndUpdate(id,{$set:obj},fn);
};

MemberCtrl.list = function(page,pageSize,mobile,name,email,provider,isEnable,fn){
    var async = require('async');
    async.series([
        function(cb){
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
            if(provider){
                query.where({provider:provider});
            }
            if(isEnable){
                query.where({isEnable:isEnable});
            }
            query.populate({path:'provider',select:'name'});
            query.sort({'provider':1});
            query.skip(page*pageSize);
            query.limit(pageSize);
            query.exec(cb);
        },function(cb){
            var query = Member.count();
            if(mobile){
                query.where({mobile:new RegExp(mobile)});
            }
            if(name){
                query.where({name:new RegExp(name)});
            }
            if(email){
                query.where({email:new RegExp(email)});
            }
            if(provider){
                query.where({provider:provider});
            }
            if(isEnable){
                query.where({isEnable:isEnable});
            }
            query.exec(cb);
        }
    ],fn);

};

MemberCtrl.detail = function(id,fn){
    Member.findById(id)
          .populate({path:'provider',select:'name'})
          .populate({path:'operator',select:'name'})
          .exec(fn);
};


MemberCtrl.login = function(mobile,passwd,fn){
    Member.findOne({'mobile':mobile,'passwd':passwd})
        .populate({'path':'provider','select':'name'})
        .exec(fn);
};

MemberCtrl.changePasswd = function(mobile,passwd,fn){
    Member.findOneAndUpdate({'mobile':mobile},{'$set':{'passwd':passwd}},fn);
};

MemberCtrl.shortList = function(provider,fn){
    Member.find({'provider':provider},fn);
};

MemberCtrl.register = function(mobile,passwd,source,fn){
    async.waterfall([
        function(cb){
            Ent.findOne({'name':source})
                .select('name')
                .exec(function(err,res){
                    if(err){
                        cb(err,null);
                    } else {
                        if(res){
                            cb(null,res);
                        } else {
                            cb(new Error('ent name error'),null);
                        }
                    }
                })
        },
        function(ent,cb){
            var member = new Member({
                'mobile':mobile,
                'passwd':passwd,
                'operator':ent._id,
                'isEnable':true
            });
            member.save(cb);
        }
    ],fn);
};

module.exports = MemberCtrl;