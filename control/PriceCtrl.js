/**
 * Created by zzy on 3/12/14.
 */
var PriceCtrl = function () {
};

var _ = require("underscore")._;

var Product = require('./../model/Product');
var Price = require('./../model/Price');
var PriceLog = require('./../model/PriceLog');
var Inventory = require('./../model/Inventory');
var ProductType = {
    ticket: 1,
    hotel: 2,
    voture: 3,
    package: 4,
    ticketPackage: 5
};

PriceCtrl.create = function (productType, obj, fn) {
    Price.find({date: {"$gte": obj.startDate, "$lt": obj.endDate}, inventory: {"$gt": 0}}, function (err, res) {
        if (!err) {
            if (res.length > 0) {
                fn(res, null);
            } else {
                obj.productType = ProductType[productType];
                var priceLog = new PriceLog(obj);
                priceLog.save(fn);
            }
        } else {
            fn(err, null);
        }
    });
};

PriceCtrl.audit = function (id, status,operator, fn) {
    //TODO 写入审核人
    status = parseInt(status);
    var async = require('async');
    switch (status) {
        case 0:
            PriceLog.findByIdAndUpdate(id, {'$set': {'status': status,'auditor':operator,'auditorTime':Date.now()}}, fn);
            break;
        case 2:
            async.waterfall([
                function (cb) {
                    PriceLog.findByIdAndUpdate(id, {"$set": {"status": status,'auditor':operator,'auditorTime':Date.now()}}, cb);
                },
                function (priceLog, cb) {
                    console.log(priceLog);
                    if (priceLog.inventoryType === 1) {
                        var inventory = new Inventory({
                            'inventory': priceLog.inventory,
                            'startDate': priceLog.startDate,
                            'endDate': priceLog.endDate
                        });
                        inventory.save(function (err, res) {
                            if (!err) {
                                cb(null, {'priceLog': priceLog, 'inventory': res});
                            } else {
                                cb(err, null);
                            }
                        });
                    } else {
                        cb(null, {'priceLog': priceLog});
                    }

                }, function (obj, cb) {
                    var priceArr = [];
                    var startDate = obj.priceLog.startDate;
                    var endDate = obj.priceLog.endDate;
                    var total = (endDate - startDate) / 86400000;
                    var weekend = obj.priceLog.weekend;
                    for (var i = 0; i < total; i++) {
                        var date = startDate + (86400000) * i;
                        var weekend = false;
                        if (_.contains(weekend, new Date(date).getDay())) {
                            weekend = true;
                        }
                        var price = {
                            'product': obj.priceLog.product,
                            'date': startDate + (86400000) * i,
                            'cost': weekend ? obj.priceLog.costWeekend : obj.priceLog.cost,
                            'price': weekend ? obj.priceLog.priceWeekend : obj.priceLog.price,
                            'marketPrice': weekend ? obj.priceLog.marketPriceWeekend : obj.priceLog.marketPrice,
                            'packagePrice': weekend ? obj.priceLog.packagePriceWeekend : obj.priceLog.packagePrice,
                            'inventory': obj.inventory === undefined ? weekend ? obj.priceLog.inventoryWeekend : obj.priceLog.inventory : 1,
                            'provider': obj.priceLog.provider,
                            'operator': obj.priceLog.operator
                        };
                        if (obj.inventory !== undefined) {
                            price.inventoryID = obj.inventory._id;
                        }
                        priceArr.push(price);
                    }

                    Price.create(priceArr, cb);
                }
            ], fn);
            break;
        case 3:
            async.waterfall([
                function (cb) {
                    PriceLog.findByIdAndUpdate(id, {"$set": {"status": status}}, cb);
                },
                function (priceLog, cb) {
                    Price.update({
                        'date': {
                            '$gte': priceLog.startDate,
                            '$lt': priceLog.endDate
                        },
                        'product': priceLog.product
                    }, {
                        '$set': {
                            'inventory': 0
                        }
                    }, {
                        'multi': true
                    }, cb);
                }
            ], fn);
            break;
        default:
            fn(null, null);
            break;
    }
};

PriceCtrl.update = function (id, obj, fn) {
    var async = require('async');
    async.waterfall([
        function (cb) {
            Price.findById(id, cb);
        },
        function (price, cb) {
            if (price.inventoryID !== undefined && obj.inventory > 1) {
                cb(price, null);
            } else {
                Price.findByIdAndUpdate(id, {
                    '$set': {
                        'cost': obj.cost,
                        'price': obj.price,
                        'marketPrice': obj.marketPrice,
                        'packagePrice': obj.packagePrice,
                        'inventory': obj.inventory
                    }
                }, cb);
            }
        }
    ], fn);
};

PriceCtrl.list = function (type, obj, fn) {
    if (type === "package" || type === 'ticketPackage') {
        var async = require('async');
        var productids = [];
        var relatedProduct;
        async.waterfall([
            function (cb) {
                Product.findById(obj.product, cb);
            },
            function (product, cb) {
                relatedProduct = product.relatedProductID;

                var day = 1;
                for (var i = 0; i < relatedProduct.length; i++) {
                    if (relatedProduct[i].day > day) {
                        day = relatedProduct[i];
                    }
                    productids.push(relatedProduct[i].product);
                }
                var expiryDate = obj.expiryDate;
                if (day > 1) {
                    expiryDate = expiryDate + (day - 1) * 86400000;
                }
                Price.find({'product': {'$in': productids}, 'date': {'$gte': obj.effectDate, '$lte': expiryDate}})
                    .sort('date')
                    .populate('inventoryID')
                    .exec(function (err, res) {
                        if(err){
                            cb(err,null);
                        } else {
                            cb(null,res);
                        }
                    });
            },
            function(prices,cb){
                //分割ProductPrice
                var productPriceArr = [];
//                console.log(prices);
                console.log();
                for(var i in productids){
                    var pid = productids[i];
                    var arr = _.filter(prices,function(p){
                        return p.product.toHexString()==pid;
                    });
                    productPriceArr.push({
                        'key':productids[i],
                        'value':arr
                    });
                }
                //找出最小日期
                var minDate = _.min(prices, function (price) {
                    return price.date;
                }).date;

                // 拼写价格
                var result = [];

                var cnt = (obj.expiryDate-minDate)/86400000;

                for(var i=0;i<cnt;i++){
                    console.log(cnt);
                    var cost=0,price=0,marketPrice=0,packagePrice=0,inventory=9999999;
                    var save = true;
                    for(var j=0;j< productPriceArr.length;j++){
                        var productDay = _.find(relatedProduct,function(product){return product.product==productPriceArr[j].key});
                        var priceobj = _.find(productPriceArr[j].value, function(p){return p.date==minDate+86400000*(i+productDay.day)})
                        if(!priceobj){
                            break;
                            save=false;
                        } else {
                            cost+=priceobj.cost*productDay.qty;
                            price+=priceobj.price*productDay.qty;
                            marketPrice+=priceobj.marketPrice*productDay.qty;
                            packagePrice+=priceobj.packagePrice*productDay.qty;
                            if(!priceobj.inventoryID && priceobj.inventory < inventory){
                                inventory = priceobj.inventory;
                            } else if(priceobj.inventoryID.inventory < inventory) {
                                inventory = priceobj.inventoryID.inventory;
                            }
                        }
                        console.log(save,cost,price,marketPrice,packagePrice,inventory);
                    }
                    if(save){
                        result.push({
                            date:minDate+86400000*i,
                            cost:cost,
                            price:price,
                            marketPrice:marketPrice,
                            packagePrice:packagePrice,
                            inventory:inventory
                        });
                        console.log(result);
                    }
                }
                //返回结果
                cb(null,result);
            }
        ], fn);
    } else {
        Price.find({
            'product': obj.productID,
            'date': {
                '$gte': obj.effiectDate,
                '$lt': obj.expiryDate
            }
        })
            .populate({path: 'inventoryID', select: 'startDate endDate'})
            .sort('date')
            .select('date cost price marketPrice packagePrice inventory inventoryID')
            .exec(fn);
    }
};


PriceCtrl.priceLogList = function (page, pageSize, productID, startDate, endDate, operatorID, providerID, status, productType, fn) {
    var async = require('async');
    async.series([
        function (cb) {
            var query = PriceLog.find();
            query.where({'status': status});
            query.where({'productType': ProductType[productType]});
            if (productID) {
                query.where({'product': productID});
            }
            if (startDate) {
                query.or([
                    {'startDate': {'$gte': startDate, "$lt": endDate}},
                    {'startDate': {'$lt': startDate}, 'endDate': {'$gt': startDate}}
                ]);
            }
            if (operatorID) {
                query.where({'operator': operatorID})
            }
            if (providerID) {
                query.where({'provider': providerID})
            }
            query.skip(page * pageSize);
            query.populate({path: 'product', select: 'name'});
            query.populate({path: 'operator', select: 'name'});
            query.populate({path: 'auditor', select: 'name'});
            query.limit(pageSize);
            query.exec(cb);
        }, function (cb) {
            var query = PriceLog.count();
            query.where({'status': status});
            if (productID) {
                query.where({'product': productID});
            }
            if (startDate) {
                query.or([
                    {'startDate': {'$gte': startDate, "$lt": endDate}},
                    {'startDate': {'$lt': startDate}, 'endDate': {'$gt': startDate}}
                ]);
            }
            if (operatorID) {
                query.where({'operator': operatorID})
            }
            if (providerID) {
                query.where({'provider': providerID})
            }
            query.exec(cb);
        }
    ], fn);
};

module.exports = PriceCtrl;
