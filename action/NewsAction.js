/**
 * Created by zzy on 3/28/14.
 */
var NewsCtrl = require('./../control/NewsCtrl');

exports.create = function(request,response){
    NewsCtrl.create(request.body,function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0});
        }
    });
};

exports.audit = function(request,response){
    NewsCtrl.audit(request.params.id,request.body.status,request.body.auditor,function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0});
        }
    });
};

exports.list = function(request,response){
    var page = request.query.page === undefined ? 0 : request.query.page;
    var pageSize = request.query.pageSize === undefined ? 25 : request.query.pageSize;
    var provider = request.query.provider;
    var startDate = request.query.startDate;
    var endDate = request.query.endDate;
    var status = request.query.status;
    NewsCtrl.list(page,pageSize,provider,startDate,endDate,status,function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
        }
    });
};

exports.detail = function(request,response){
    NewsCtrl.detail(request.params.id,function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data':res});
        }
    });
};

exports.shortList = function(request,response){
    var page = request.query.page === undefined ? 0 : request.query.page;
    var pageSize = request.query.pageSize === undefined ? 25 : request.query.pageSize;
    var provider = request.query.provider;
    var startDate = request.query.startDate;
    var endDate = request.query.endDate;
    var status = request.query.status;
    NewsCtrl.shortList(page,pageSize,provider,startDate,endDate,status,function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
        }
    });
};