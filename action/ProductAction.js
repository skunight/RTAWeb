/**
 * Created by zzy on 3/24/14.
 */
var ProductCtrl = require('./../control/ProductCtrl');
exports.create = function(request,response){
    ProductCtrl.create(request.params.productType, request.body, function (err) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err.message});
        } else {
            response.send({'error': 0});
        }
    });
};

exports.update = function(request,response){
    ProductCtrl.update(request.params.id, request.params.productType, request.body, function (err) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err.message});
        } else {
            response.send({'error': 0});
        }
    })
};

exports.list = function(request,response){
    var page = request.query.page === undefined ? 0 : request.query.page;
    var pageSize = request.query.pageSize === undefined ? 25 : request.query.pageSize;
    var name = request.query.name;
    var cityID = request.query.providerID;
    var effectDate = request.query.effectDate;
    var expiryDate = request.query.expiryDate;
    var isEnable = request.query.isEnable;

    ProductCtrl.list(request.params.productType, page, pageSize, name, cityID, effectDate, expiryDate, isEnable, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err.message});
        } else {
            response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
        }
    });
};

exports.detail = function(request,response){
    ProductCtrl.detail(request.params.id, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err.message});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.shortList = function(request,response){
    ProductCtrl.shortList(request.params.productType, request.query.city, request.query.name, request.query.limit,function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err.message});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.relatedProduct = function(request,response){
    ProductCtrl.relatedProduct(request.params.id, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err.message});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.imageDetail = function(request,response){
    ProductCtrl.imageDetail(request.params.id,function(err,res){
        if (err) {
            response.send({'error': 1, 'errorMsg': err.message});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.imageDelete = function(request,response){
    ProductCtrl.imageDelete(request.params.id,response.body.position,function(err,res){
        if (err) {
            response.send({'error': 1, 'errorMsg': err.message});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};
