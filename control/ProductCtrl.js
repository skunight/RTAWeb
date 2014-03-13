/**
 * Created by zzy on 3/10/14.
 */
var ProductCtrl = function(){};
var Product = require('./../model/Product');
var ProductType = {
    ticket:1,
    hotel:2,
    voture:3,
    package:4
};

ProductCtrl.create = function(type,obj,fn){
    var images = (function(){
        var imgStrArr = obj.image.split(',');
        var image = [];
        for(var i=0;i<imgStrArr.length;i++){
            image.push({
                url: imgStrArr[i].split(":")[0],
                intro: imgStrArr[i].split(":")[1]
            });
        }
        return image;
    })();
    var productObj = {
        name:obj.name,
        relatedProductID:obj.relatedProductID,
        intro: obj.intro,
        image: images,
        city: obj.cityID,
        addr: obj.addr,
        gps: {lat: obj.GPS.split(",")[0], lon: obj.GPS.split(",")[1]},
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

    }
    var product = new Product(productObj);
    product.save(fn);
};

ProductCtrl.list = function(type,page,pageSize,name,cityID,effectDate,expiryDate,isEnable,fn){
    var query = Product.find();
    query.select('name city level effectDate expiryDate isEnable createTime subType');
    query.where({type:ProductType[type]});
    if(name){
        query.where({mobile:new RegExp(name)});
    }
    if(cityID){
        query.where({city:cityID});
    }
    if(effectDate){
        query.where({effectDate:{"$gte":effectDate}});
    }
    if(expiryDate){
        query.where({effectDate:{"$lt":effectDate}});
    }
    if(isEnable){
        query.where({isEnable:isEnable});
    }
    query.skip(page*pageSize);
    query.limit(pageSize);
    query.populate({path:'city',select:'name'});
    query.exec(fn);
};

ProductCtrl.detail = function(id,fn){
    Product.findById(id)
        .populate({path:'city',select:'name'})
        .populate({path:'operator',select:'name'})
        .exec(fn);
};

ProductCtrl.update = function(id,obj,fn){
    var images = (function(){
        var imgStrArr = obj.image.split(',');
        var image = [];
        for(var i=0;i<imgStrArr.length;i++){
            image.push({
                url: imgStrArr[i].split(":")[0],
                intro: imgStrArr[i].split(":")[1]
            });
        }
        return image;
    })();
    var productObj = {
        name:obj.name,
        relatedProductID:obj.relatedProductID,
        intro: obj.intro,
        image: images,
        city: obj.cityID,
        addr: obj.addr,
        gps: {lat: obj.GPS.split(",")[0], lon: obj.GPS.split(",")[1]},
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
    }

    productObj.updateTime=Date.now();
    Product.findByIdAndUpdate(id,{$set:productObj},fn);
};

module.exports = ProductCtrl;