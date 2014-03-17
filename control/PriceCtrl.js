/**
 * Created by zzy on 3/12/14.
 */
var PriceCtrl = function () {};

var _ = require("underscore")._;

var Product = require('./../model/Product');
var Price = require('./../model/Price');
var PriceLog = require('./../model/PriceLog');
var Inventory = require('./../model/Inventory');


//TODO Add Type Key
PriceCtrl.create = function (obj, fn) {
    Price.find({date: {"$gte": obj.startDate, "$lt": obj.endDate}, inventory: {"$gt": 0}}, function (err, res) {
        if (!err) {
            if (res.length > 0) {
                fn(res, null);
            } else {
                var priceLog = new PriceLog(obj);
                priceLog.save(fn);
            }
        } else {
            fn(err, null);
        }
    });
};

PriceCtrl.audit = function (id, status, fn) {
    var async = require('async');

    switch (status) {
        case 0:
            PriceLog.findByIdAndUpdate(id, {"$set": {"status": status}}, fn);
            break;
        case 2:
            async.waterfall([
                function (cb) {
                    PriceLog.findByIdAndUpdate(id, {"$set": {"status": status}}, cb);
                },
                function (priceLog, cb) {
                    if(priceLog.inventoryType === 1){
                        var inventory = new Inventory({
                            'inventory':priceLog.inventory,
                            'startDate':priceLog.startDate,
                            'endDate':priceLog.endDate
                        });
                        inventory.save(function(err,res){
                            if(!err){
                                cb(null,{'priceLog':priceLog,'inventory':res});
                            } else {
                                cb(err,null);
                            }
                        });
                    } else {
                        cb(null,{'priceLog':priceLog});
                    }

                },function(obj,cb){
                    var priceArr =[];
                    var startDate = obj.priceLog.startDate;
                    var endDate = obj.priceLog.endDate;
                    var total = (endDate-startDate)/86400000;
                    var weekend = obj.priceLog.weekend;
                    for(var i=0;i<total;i++){
                        var date = startDate+(86400000)*i;
                        var weekend = false;
                        if(_.contains(weekend, new Date(date).getDay())){
                            weekend = true;
                        }
                        var price = {
                            'product':obj.priceLog.product,
                            'date':startDate+(86400000)*i,
                            'cost':weekend?obj.priceLog.costWeekend:obj.priceLog.cost,
                            'price':weekend?obj.priceLog.priceWeekend:obj.priceLog.price,
                            'marketPrice':weekend?obj.priceLog.marketPriceWeekend:obj.priceLog.marketPrice,
                            'packagePrice':weekend?obj.priceLog.packagePriceWeekend:obj.priceLog.packagePrice,
                            'inventory':obj.inventory===undefined?weekend?obj.priceLog.inventoryWeekend:obj.priceLog.inventory:1,
                            'provider':obj.priceLog.provider,
                            'operator':obj.priceLog.operator
                        };
                        if(obj.inventory!==undefined){
                            price.inventoryID = obj.inventory._id;
                        }
                        priceArr.push(price);
                    }

                    Price.create(priceArr,cb);
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
            fn(null,null);
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
            if (price.inventoryID!==undefined && obj.inventory>1) {
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

PriceCtrl.list = function(type,obj){
    if(type==="package"){
        var async = require('async');
        async.waterfall([
            function(cb){
                Product.findById(obj.productID,cb);
            },
            function(product,cb){
                var relatedProduct = product.relatedProductID;
                var products = [];
                var productKeys = [];
                for(var i in relatedProduct){ //get every Day
                    for(var j in relatedProduct[i]){ //get every product
                        products.push({
                            'id':relatedProduct[i][j][0],
                            'qty':relatedProduct[i][j][1],
                            'day':i
                        });
                        productKeys.push(relatedProduct[i][j][0]);
                    }
                }
                Price.find({'product':{'$in': _.keys(productKeys)},'date':{'$gte':obj.effiectDate,'$lt':obj.expiryDate}})
                    .sort('date')
                    .populate('inventoryID')
                    .exec(function(err,res){
                        if(!err){
                            cb(null,{'productKeys':productKeys,'product':products,'price':res});
                        } else {
                            cb(err,null);
                        }
                    });
            },
            function(o,cb){
                //分割ProductPrice
                var productPriceArr = [];

                for(var i in o.productKeys){
                    productPriceArr.push({
                        'key':o.productKeys[i],
                        'value':_.where(o.price,{product: o.productKeys[i]})
                    });
                }

                //找出最小日期
                var minDate = _.min(o.price, function (price) {
                    return price.date;
                }).date;

                // 拼写价格
                var result = [];

                var cnt = obj.expiryDate-minDate/86400000;
                for(var i=0;i<cnt;i++){
                    var cost=0,price=0,marketPrice=0,packagePrice=0,inventory=9999999;
                    var save = true;
                    for(var j=0;j< productPriceArr.length;j++){
                        var productDay = _.find(o.product,function(product){return product.id==productPriceArr[j].key});
                        var price = _.find(productPriceArr[j].value, function(p){return p.date==minDate+86400000*(i+productDay.day)});
                        if(!price){
                            break;
                            save=false;
                        } else {
                            cost+=price.cost*productDay.qty;
                            price+=price.price*productDay.qty;
                            marketPrice+=marketPrice.price*productDay.qty;
                            packagePrice+=packagePrice.price*productDay.qty;
                            if(!price.inventoryID&&price.inventory<inventory){
                                inventory=price.inventory;
                            } else if(price.inventoryID.inventory<inventory) {
                                inventory=price.inventoryID.inventory;
                            }
                        }
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
                    }
                }
                //返回结果
                cb(null,result);
            }
        ],fn);
    } else {
        Price.find({
            'product':obj.productID,
            'date':{
                '$gte':obj.effiectDate,
                '$lt':obj.expiryDate
            }
        })
            .populate({path:'inventoryID',select:'startDate endDate'})
            .sort('date')
            .select('date cost price marketPrice packagePrice inventory inventoryID')
            .exec(fn);
    }
};


PriceCtrl.priceLogList = function(productID,startDate,endDate,operatorID,providerID,status,fn){
    var query = PriceLog.find();
    query.where({'status':status});
    if(productID){
        query.where({'product':productID});
    }
    if(startDate){
        query.or([{'startDate':{'$gte':startDate,"$lt":endDate}},{'startDate':{'$lt':startDate},'endDate':{'$gt':startDate}}]);
    }
    if(operatorID){
        query.where({'operator':operatorID})
    }
    if(providerID){
        query.where({'provider':providerID})
    }
    query.exec(fn);
};

module.exports = PriceCtrl;