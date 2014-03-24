/**
 * Created by zzy on 3/24/14.
 */

var ProviderCtrl = require('./../control/ProviderCtrl');

exports.create = function(request,response){
    ProviderCtrl.create(request.body, function (err) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0});
        }
    });
};

exports.update = function(request,response){
    ProviderCtrl.update(request.params.id, request.body, function (err) {
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
    ProviderCtrl.list(page, pageSize, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
        }
    });
};

exports.detail = function(request,response){
    ProviderCtrl.detail(request.params.id, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    })
};

exports.shortList = function(request,response){
    ProviderCtrl.shortList(function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

