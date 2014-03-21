/*
 * GET home page.
 */

module.exports = function (app) {
    var ProviderCtrl = require('./../control/ProviderCtrl');
    var MemberCtrl = require('./../control/MemberCtrl');
    var ProductCtrl = require('./../control/ProductCtrl');
    var PriceCtrl = require('./../control/PriceCtrl');
    var ModuleCtrl = require('./../control/ModuleCtrl');
    var CityCtrl = require('./../control/CityCtrl');

    app.all('*', function (request, response, next) {
        response.charset = 'utf-8';
        response.contentType('json');
        next();
    });

    app.post('/ent/provider/create', function (request, response) {
        ProviderCtrl.create(request.body, function (err) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        });
    });

    app.post('/ent/provider/update/:id', function (request, response) {
        ProviderCtrl.update(request.params.id, request.body, function (err) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        })
    });

    app.get('/ent/provider/list', function (request, response) {
        var page = request.query.page === undefined ? 0 : request.query.page;
        var pageSize = request.query.pageSize === undefined ? 25 : request.query.pageSize;
        ProviderCtrl.list(page, pageSize, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
            }
        });
    });

    app.get('/ent/provider/detail/:id', function (request, response) {
        ProviderCtrl.detail(request.params.id, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        })
    });


    app.post('/ent/provider/member/create', function (request, response) {
        MemberCtrl.create(request.body, function (err) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        });
    });

    app.post('/ent/provider/member/update/:id', function (request, response) {
        MemberCtrl.update(request.params.id, request.body, function (err) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        })
    });

    app.get('/ent/provider/member/list', function (request, response) {
        var page = request.query.page === undefined ? 0 : request.query.page;
        var pageSize = request.query.pageSize === undefined ? 25 : request.query.pageSize;
        var mobile = request.query.mobile;
        var name = request.query.name;
        var email = request.query.email;
        var provider = request.query.provider;
        var isEnable = request.query.isEnable;
        MemberCtrl.list(page, pageSize, mobile, name, email, provider, isEnable, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
            }
        });
    });

    app.get('/ent/provider/member/detail/:id', function (request, response) {
        MemberCtrl.detail(request.params.id, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        })
    });

    app.post('/product/:productType/create', function (request, response) {
        ProductCtrl.create(request.params.productType, request.body, function (err) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        });
    });

    app.get('/product/:productType/list', function (request, response) {
        var page = request.query.page === undefined ? 0 : request.query.page;
        var pageSize = request.query.pageSize === undefined ? 25 : request.query.pageSize;
        var name = request.query.name;
        var cityID = request.query.providerID;
        var effectDate = request.query.effectDate;
        var expiryDate = request.query.expiryDate;
        var isEnable = request.query.isEnable;

        ProductCtrl.list(request.params.productType, page, pageSize, name, cityID, effectDate, expiryDate, isEnable, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
            }
        });
    });

    app.get('/product/:productType/detail/:id', function (request, response) {
        ProductCtrl.detail(request.params.id, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    });

    app.post('/product/:productType/update/:id', function (request, response) {
        ProductCtrl.update(request.params.id, request.body, function (err) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        })
    });

    app.post('/product/:productType/price/create', function (request, response) {
        PriceCtrl.create(request.params.productType, request.body, function (err) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        });
    });

    app.post('/product/:productType/price/audit/:id', function (request, response) {
        PriceCtrl.audit(request.params.id, request.body.status, function (err) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        });
    });

    app.post('/product/:productType/price/update/:id', function (request, response) {
        PriceCtrl.update(request.params.id, request.body, function (err) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        });
    });

    app.get('/product/:productType/price/list/:id', function (request, response) {
        var obj = {
            product: request.params.id,
            effiectDate: request.query.effiectDate,
            expiryDate: request.query.expiryDate
        };
        PriceCtrl.update(request.params.productType, obj, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    });
    app.get('/product/:productType/priceLog/list', function (request, response) {

        var obj = {
            productID:request.query.product,
            startDate : request.query.startDate,
            endDate :request.query.endDate,
            operatorID : request.query.operator,
            providerID : request.query.provider,
            status : request.query.status
        }
        PriceCtrl.list(request.params.productType, obj, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                //response.send({'error': 0, 'data': res[0], 'totalPage': Math.ceil(res[1] / pageSize), 'totalCount': res[1]});
                response.send({'error': 0, 'data': res,'totalPage':1,'totalCount':1});
            }
        });
    });

    app.get('/product/:productType/shortList', function (request, response) {
        ProductCtrl.shortList(request.params.productType, request.query.city, request.query.name, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    });

    app.get('/product/package/RelatedProduct/:id', function (request, response) {
        ProductCtrl.relatedProduct(request.params.id, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    });

    app.get('/provider/shortList', function (request, response) {
        ProviderCtrl.shortList(function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    });

    app.get('/module/shortList', function (request, response) {
        ModuleCtrl.list(function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    });

    app.get('/city/shortList', function (request, response) {
        CityCtrl.shortList(function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    });

    app.get('/product/:productType/image/detail/:id', function (request, response) {
    });

    app.post('/member/login', function (request, response) {
        MemberCtrl.login(request.body.mobile, request.body.passwd, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    });

    app.post('/member/password/change', function (request, response) {
        MemberCtrl.changePasswd(request.body.mobile, request.body.passwd, function (err, res) {
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0});
            }
        });
    });

    app.post('/product/:productType/image/delete/:id', function (request, response) {
    });

    app.get('/ent/provider/member/shortList',function(request,response){
        MemberCtrl.shortList(request.query.provider,function(err,res){
            if (err) {
                response.send({'error': 1, 'errorMsg': err});
            } else {
                response.send({'error': 0, 'data': res});
            }
        });
    });
};

/*
 app.get('',function(request,response){});
 app.post('',function(request,response){});
 */