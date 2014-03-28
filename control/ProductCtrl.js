/**
 * Created by zzy on 3/10/14.
 */
var ProductCtrl = function () {
};
var Product = require('./../model/Product');
var ProductType = {
    ticket: 1,
    hotel: 2,
    voture: 3,
    package: 4,
    ticketPackage: 5
};

ProductCtrl.create = function (type, obj, fn) {
    var images = (function () {
        var image = [];
        if (obj.image != '') {
            var imgStrArr = obj.image.split(',');
            for (var i = 0; i < imgStrArr.length; i++) {
                image.push({
                    url: imgStrArr[i].split(":")[0],
                    intro: imgStrArr[i].split(":")[1]
                });
            }
        }
        return image;
    })();
    var productObj = {
        name: obj.name,
        relatedProductID: JSON.parse(obj.relatedProductID),
        intro: obj.intro,
        content: obj.content,
        image: images,
        city: obj.city,
        addr: obj.addr,
        gps: obj.gps == '' ? null : {lat: obj.gps.split(",")[0], lon: obj.gps.split(",")[1]},
        level: obj.level,
        openTime: obj.openTime,
        bookRule: obj.bookRule,
        useRule: obj.useRule,
        cancelRule: obj.cancelRule,
        transportation: obj.transportation,
        effectDate: obj.effectDate,
        expiryDate: obj.expiryDate,
        isEnable: obj.isEnable,
        contactName: obj.contactName,
        tel: obj.tel,
        fax: obj.fax,
        type: ProductType[type],
        subType: obj.subType,
        operator: obj.operator
    };
    var product = new Product(productObj);
    product.save(fn);
};

ProductCtrl.list = function (type, page, pageSize, name, cityID, effectDate, expiryDate, isEnable, fn) {

    var async = require('async');
    async.series([
        function (cb) {
            var query = Product.find();
            query.select('name city level effectDate expiryDate isEnable createTime subType');
            query.where({type: ProductType[type]});
            if (name) {
                query.where({mobile: new RegExp(name)});
            }
            if (cityID) {
                query.where({city: cityID});
            }
            if (effectDate) {
                query.or([
                    {'effectDate': {'$gte': effectDate, "$lt": expiryDate}},
                    {'effectDate': {'$lt': effectDate}, 'expiryDate': {'$gt': effectDate}}
                ]);
            }
            if (isEnable) {
                query.where({isEnable: isEnable});
            }
            query.skip(page * pageSize);
            query.sort({'city': 1});
            query.limit(pageSize);
            query.populate({path: 'city', select: 'name'});
            query.exec(cb);
        }, function (cb) {
            var query = Product.count();
            query.where({type: ProductType[type]});
            if (name) {
                query.where({mobile: new RegExp(name)});
            }
            if (cityID) {
                query.where({city: cityID});
            }
            if (effectDate) {
                query.or([
                    {'effectDate': {'$gte': effectDate, "$lt": expiryDate}},
                    {'effectDate': {'$lt': effectDate}, 'expiryDate': {'$gt': effectDate}}
                ]);
            }
            if (isEnable) {
                query.where({isEnable: isEnable});
            }
            query.exec(cb);
        }
    ], fn);

};

ProductCtrl.detail = function (id, fn) {
    Product.findById(id)
        .populate({path: 'city', select: 'name'})
        .populate({path: 'operator', select: 'name'})
        .exec(fn);
};

ProductCtrl.update = function (id, type, obj, fn) {
    var images = (function () {
        var image = [];
        if (obj.image != '') {
            var imgStrArr = obj.image.split(',');
            for (var i = 0; i < imgStrArr.length; i++) {
                image.push({
                    url: imgStrArr[i].split(":")[0],
                    intro: imgStrArr[i].split(":")[1]
                });
            }
        }
        return image;
    })();
    var productObj = {
        name: obj.name,
        relatedProductID: obj.relatedProductID,
        intro: obj.intro,
        content: obj.content,
        image: images,
        city: obj.city,
        addr: obj.addr,
        gps: obj.gps == '' ? null : {lat: obj.gps.split(",")[0], lon: obj.gps.split(",")[1]},
        level: obj.level,
        openTime: obj.openTime,
        bookRule: obj.bookRule,
        useRule: obj.useRule,
        cancelRule: obj.cancelRule,
        transportation: obj.transportation,
        effectDate: obj.effectDate,
        expiryDate: obj.expiryDate,
        isEnable: obj.isEnable,
        contactName: obj.contactName,
        tel: obj.tel,
        fax: obj.fax,
        type: ProductType[type],
        subType: obj.subType,
        operator: obj.operator
    };

    productObj.updateTime = Date.now();
    Product.findByIdAndUpdate(id, {$set: productObj}, fn);
};

ProductCtrl.shortList = function (type, city, name, limit, fn) {
    var query = Product.find();
    query.select('name');
    query.where({'isEnable': true});
    query.where({'type': ProductType[type]});
    if (city) {
        query.where({'city': city});
    }
    if (name) {
        query.where({'name': new RegExp(name)});
    }
    if (limit) {
        query.limit(limit);
    }
    query.exec(fn);
};

ProductCtrl.relatedProduct = function (id, fn) {
    Product.findById(id, function (err, res) {
        if (err) {
            fn(err, null);
        } else {
            var result = [];
            var relatedProductID = res.relatedProductID;
            for (var i = 0; i < relatedProductID.length; i++) {
                for (var j = 0; i < relatedProductID[i].length; j++) {
                    //{productID:"dfdfd",productName:"dfdfdf",dayID:1,quantity:2}
                    result.push({
                        'product': relatedProductID[i][j][0],
                        'productName': "",
                        'day': i + 1,
                        'qty': relatedProductID[i][j][1]
                    });
                }
            }
            fn(null, result);
        }
    });
};

ProductCtrl.imageDetail = function (id, fn) {
    Product.findById(id)
        .select('image')
        .exec(function (e, r) {
            if (e) {
                fn(e, null);
            } else {
                fn(null, r.image);
            }
        });
};

ProductCtrl.imageDelete = function (id, position, fn) {
    var async = require('async');
    async.waterfall([
        function (cb) {
            Product.findById(id)
                .select('image')
                .exec(function (e, r) {
                    if (e) {
                        cb(e, null);
                    } else {
                        cb(null, r.image);
                    }
                });
        },
        function (image, cb) {
            image = image.splice(position, 1);
            Product.findByIdAndUpdate(id, {'$set': {'image': image}}, function (err, res) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, image);
                }
            });
        }
    ], fn);

};

ProductCtrl.webList = function (hot, city, fn) {
    var query = Product.find();
    query.where({'city': city});
    query.select({'name': 1, 'image': 1})
    if (hot!==undefined) {
        query.limit(2);
    }
    query.exec(fn);
}

module.exports = ProductCtrl;