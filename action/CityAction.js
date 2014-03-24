/**
 * Created by zzy on 3/24/14.
 */
var CityCtrl = require('./../control/CityCtrl');

exports.shortList = function(request,response){
    CityCtrl.shortList(function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};