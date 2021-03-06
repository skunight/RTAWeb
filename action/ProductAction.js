/**
 * Created by zzy on 3/24/14.
 */
var ProductCtrl = require('./../control/ProductCtrl');
var CustomError = require('./../tools/CustomError');
exports.create = function(request,response){
    ProductCtrl.create(request.params.productType, request.body, function (err) {
        if (err) {
            if(err.name=='MongoError'&&err.code==11000){
                response.send({'error': 103, 'errorMsg': CustomError['103']});
            } else {
                response.send({'error': 1, 'errorMsg': err.message});
            }
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
    var city = request.query.city;
    var effectDate = request.query.effectDate;
    var expiryDate = request.query.expiryDate;
    var isEnable = request.query.isEnable;

    ProductCtrl.list(request.params.productType, page, pageSize, name, city, effectDate, expiryDate, isEnable, function (err, res) {
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

exports.webList = function(request,response){
    var hot = request.query.hot;
    var city = request.params.city;
    ProductCtrl.webList(hot,city,function(err,res){
        if (err) {
            response.send({'error': 1, 'errorMsg': err.message});
        } else {
            var result = [];
            for(var i=0;i<res.length;i++){
                result.push({
                    '_id':res[i]._id,
                    'name':res[i].name,
                    'image':res[i].image,
                    'price':500
                });

            }
            response.send({'error': 0, 'data': result});
        }
    });
};



