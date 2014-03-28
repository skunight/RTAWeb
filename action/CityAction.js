/**
 * Created by zzy on 3/24/14.
 */
var CityCtrl = require('./../control/CityCtrl');

exports.shortList = function(request,response){
    CityCtrl.shortList(null,function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.wapCityList = function(request,response){
    var key = request.query.key;
    CityCtrl.shortList(key,function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.wapCityName = function(request,response){
    var id = request.params.id;
    CityCtrl.getName(id,function(err,res){
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};