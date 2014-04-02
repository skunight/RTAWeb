/**
 * Created by zzy on 3/24/14.
 */
var ModuleCtrl = require('./../control/ModuleCtrl');
var CustomError = require('./../tools/CustomError');
exports.shortList = function(request,response){
    ModuleCtrl.shortList(function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.privList = function(request,response){
    ModuleCtrl.privList(function (err, res) {
        if (err) {
            response.send({'error': 1, 'errorMsg': err});
        } else {
            response.send({'error': 0, 'data': res});
        }
    });
};

exports.privUpdate = function(request,response){
    var member = request.body.member;
    var module = request.body.module;
    var isEnable = request.body.isEnable;
    var operator = request.body.operator;
    if(!member||!module||!isEnable||!operator){
        response.send({'error': 400, 'errorMsg': CustomError['400']});
    } else {
        ModuleCtrl.privUpdate(member,module,isEnable,operator,function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    }
};