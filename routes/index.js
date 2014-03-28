/*
 * GET home page.
 */

module.exports = function (app) {
    var ProviderAction = require('./../action/ProviderAction');
    var MemberAction = require('./../action/MemberAction');
    var ProductAction = require('./../action/ProductAction');
    var PriceAction = require('./../action/PriceAction');
    var ModuleAction = require('./../action/ModuleAction');
    var CityAction = require('./../action/CityAction');
    var NewsAction = require('./../action/NewsAction');

    app.all('*', function (request, response, next) {
        response.charset = 'utf-8';
        response.contentType('json');
        next();
    });

    //后端接口
    app.post('/ent/provider/create',ProviderAction.create);
    app.post('/ent/provider/update/:id', ProviderAction.update);
    app.get('/ent/provider/list', ProviderAction.list);
    app.get('/ent/provider/detail/:id', ProviderAction.detail);
    app.get('/provider/shortList', ProviderAction.shortList);

    app.post('/ent/provider/member/create', MemberAction.create);
    app.post('/ent/provider/member/update/:id', MemberAction.update);
    app.get('/ent/provider/member/list', MemberAction.list);
    app.get('/ent/provider/member/detail/:id', MemberAction.detail);
    app.get('/ent/provider/member/shortList', MemberAction.shortList);

    app.post('/product/:productType/create', ProductAction.create);
    app.get('/product/:productType/list', ProductAction.list);
    app.get('/product/:productType/detail/:id', ProductAction.detail);
    app.post('/product/:productType/update/:id', ProductAction.update);
    app.get('/product/:productType/shortList', ProductAction.shortList);
    app.get('/product/package/RelatedProduct/:id', ProductAction.relatedProduct);
    app.get('/product/:productType/image/detail/:id', ProductAction.imageDetail);
    app.post('/product/:productType/image/delete/:id', ProductAction.imageDelete);

    app.post('/product/:productType/price/create', PriceAction.create);
    app.post('/product/:productType/price/audit/:id', PriceAction.audit);
    app.post('/product/:productType/price/update/:id', PriceAction.update);
    app.get('/product/:productType/price/list/:id', PriceAction.list);
    app.get('/product/:productType/priceLog/list', PriceAction.priceLogList);

    app.post('/news/create',NewsAction.create);
    app.post('/news/aduit/:id', NewsAction.aduit);
    app.get('/news/list', NewsAction.list);
    app.get('/news/detail/:id', NewsAction.detail);
    app.get('/news/shortList', NewsAction.shortList);

    app.post('/member/login', MemberAction.login);
    app.post('/member/password/change', MemberAction.changePasswd);

    app.get('/module/shortList', ModuleAction.shortList);
    app.get('/city/shortList', CityAction.shortList);

    //WAP接口
    app.get('/wap/city/list',CityAction.wapCityList);
    app.get('/wap/city/name/:id',CityAction.wapCityName);
    app.get('/wap/product/hotList/:city',ProductAction.webList);
    app.get('/wap/product/webList/:city',ProductAction.webList);
    app.post('/member/:source/register', MemberAction.register);
};

/*
 app.get('',function(request,response){});
 app.post('',function(request,response){});
 */