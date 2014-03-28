/**
 * Created by zzy on 3/28/14.
 */
var NewsCtrl = function(){};
var Notice = require('./../model/Notice');

NewsCtrl.create = function(obj,fn){
   var notice = new Notice(obj);
   notice.save(fn);
};

NewsCtrl.audit = function(id,status,auditor,fn){
    Notice.findByIdAndUpdate(id,{
        '$set':{
            'status':status,
            'auditor':auditor,
            'auditorTime':Date.now()
        }
    },fn);
};

NewsCtrl.list = function(page,pageSize,provider,startDate,endDate,status,fn){
    var async = require('async');
    async.series([
        function(cb){
            var query = Notice.find();
            if(provider){
                query.where({'provider':provider});
            }
            if(startDate){
                query.where({'createTime':{'$gte':startDate,'$lt':endDate}});
            }
            if(status){
                query.where({'status':status});
            }
            query.skip(page*pageSize);
            query.limit(pageSize);
            query.populate({path: 'provider', select: 'name'});
            query.populate({path: 'operator', select: 'name'});
            query.populate({path: 'auditor', select: 'name'});
            query.exec(cb);
        },function(cb){
            var query = Notice.count();
            if(provider){
                query.where({'provider':provider});
            }
            if(startDate){
                query.where({'createTime':{'$gte':startDate,'$lt':endDate}});
            }
            if(status){
                query.where({'status':status});
            }
            query.exec(cb);
        }
    ],fn);
};

NewsCtrl.detail = function(id,fn){
    console.log(id);
    Notice.findById(id)
        .populate({path: 'provider', select: 'name'})
        .populate({path: 'operator', select: 'name'})
        .populate({path: 'auditor', select: 'name'})
        .exec(fn);
};

NewsCtrl.shortList = function(page,pageSize,provider,startDate,endDate,status,fn){
    var async = require('async');
    async.series([
        function(cb){
            var query = Notice.find();
            if(provider){
                query.where({'provider':provider});
            }
            if(startDate){
                query.where({'createTime':{'$gte':startDate,'$lt':endDate}});
            }
            if(status){
                query.where({'status':status});
            }
            query.skip(page*pageSize);
            query.limit(pageSize);
            query.select('title createTime');
            query.exec(cb);
        },function(cb){
            var query = Notice.count();
            if(provider){
                query.where({'provider':provider});
            }
            if(startDate){
                query.where({'createTime':{'$gte':startDate,'$lt':endDate}});
            }
            if(status){
                query.where({'status':status});
            }
            query.exec(cb);
        }
    ],fn);
};

module.exports = NewsCtrl;