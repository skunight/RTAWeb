/**
 * Created by zzy on 3/24/14.
 */
var PriceCtrl = require('./../control/PriceCtrl');

exports.create = function(request,response){
    PriceCtrl.create(request.params.productType, request.body, function (err) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0});
        }
    });
};

exports.update = function(request,response){
    PriceCtrl.update(request.params.id, request.body, function (err) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0});
        }
    });
};

exports.list = function(request,response){
    var obj = {
        product: request.params.id,
        effectDate: request.query.effectDate,
        expiryDate: request.query.expiryDate
    };
    PriceCtrl.list(request.params.productType, obj, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.audit = function(request,response){
    PriceCtrl.audit(request.params.id, request.body.status, function (err) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0});
        }
    });
};

exports.priceLogList = function(request,response){
    var page = request.query.page === undefined ? 0 : request.query.page;
    var pageSize = request.query.pageSize === undefined ? 25 : request.query.pageSize;
    var productType = request.params.productType;
    var productID = request.query.product;
    var startDate = request.query.startDate;
    var endDate = request.query.endDate;
    var operatorID = request.query.operator;
    var providerID = request.query.provider;
    var status = request.query.status;

    PriceCtrl.priceLogList(page,pageSize,productID, startDate, endDate, operatorID, providerID, status,productType, function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
        }
    });
};
