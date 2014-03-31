/**
 * Created by zzy on 3/24/14.
 */
var MemberCtrl = require('./../control/MemberCtrl');
var CustomError = require('./../tools/CustomError');
exports.create = function(request,response){
    MemberCtrl.create(request.body, function (err) {
        if (err) {
            if(err.name=='MongoError'&&err.code==11000){
                response.send({'error': '102', 'errorMsg': CustomError['102']});
            } else {
                response.send({'error': 1, 'errorMsg': err.message});
            }
        } else {
            response.send({'error': 0});
        }
    });
};

exports.update = function(request,response){
    MemberCtrl.update(request.params.id, request.body, function (err) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0});
        }
    })
};

exports.list = function(request,response){
    var page = request.query.page === undefined ? 0 : request.query.page;
    var pageSize = request.query.pageSize === undefined ? 25 : request.query.pageSize;
    var mobile = request.query.mobile;
    var name = request.query.name;
    var email = request.query.email;
    var provider = request.query.provider;
    var isEnable = request.query.isEnable;
    MemberCtrl.list(page, pageSize, mobile, name, email, provider, isEnable, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
        }
    });
};

exports.detail = function(request,response){
    MemberCtrl.detail(request.params.id, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    })
};

exports.login = function(request,response){
    MemberCtrl.login(request.body.mobile, request.body.passwd, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            if(res){
                response.send({'error': 0, 'data': res});
            } else {
                response.send({'error': '101', 'errorMsg': CustomError['101']});
            }

        }
    });
};

exports.changePasswd = function(request,response){
    MemberCtrl.changePasswd(request.body.mobile, request.body.passwd, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0});
        }
    });
};

exports.shortList = function(request,response){
    MemberCtrl.shortList(request.query.provider, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.register = function(request,response){
    var source = request.params.source;
    var mobile = request.body.mobile;
    var passwd = request.body.passwd;
    MemberCtrl.register(mobile,passwd,source,function(err,res){
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};