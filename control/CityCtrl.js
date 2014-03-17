/**
 * Created by zzy on 3/17/14.
 */
var CityCtrl = function(){};
var City = require('./../model/City');

CityCtrl.shortList = function(fn){
    City.find()
        .where({'isEnable':true})
        .select('name')
        .sort({'order':1})
        .exec(fn);
};

module.exports = CityCtrl;