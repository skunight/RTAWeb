/**
 * Created by zzy on 3/17/14.
 */
var CityCtrl = function(){};
var City = require('./../model/City');

CityCtrl.shortList = function(key,fn){
    var query = City.find();
    if(key){
        query.or([{'name':new RegExp(key)},{'pinyin':new RegExp(key)}]);
    }
    query.where({'isEnable':true})
    query.select('name')
    query.sort({'order':1})
    query.exec(fn);
};

CityCtrl.getName = function(id,fn){
  City.findById(id)
      .select('name')
      .exec(fn);
};
module.exports = CityCtrl;