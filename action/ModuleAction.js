/**
 * Created by zzy on 3/24/14.
 */
var ModuleCtrl = require('./../control/ModuleCtrl');

exports.shortList = function(request,response){
    ModuleCtrl.shortList(function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};