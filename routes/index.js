
/*
 * GET home page.
 */
module.exports = function(app){
    var ProviderCtrl = require('./../control/ProviderCtrl');
    var MemberCtrl = require('./../control/MemberCtrl');
    var ProductCtrl = require('./../control/ProductCtrl');
    app.post('/ent/provider/create',function(request,response){
        response.contentType('json');
        ProviderCtrl.create(request.body,function(err,res){
           if(!err){
               response.send({'error':0});
           } else {
               response.send({'error':1,'errorMsg':err});
           }
        });
    });

    app.post('/ent/provider/update/:id',function(request,response){
        response.contentType('json');
        ProviderCtrl.update(request.params.id,request.body,function(err,res){
            if(!err){
                response.send({'error':0});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        })
    });

    app.get('/ent/provider/list',function(request,response){
        response.contentType('json');
        var page = request.query.page===undefined?0:request.query.page;
        var pageSize = request.query.pageSize===undefined?25:request.query.pageSize;
        ProviderCtrl.list(page,pageSize,function(err,res){
            if(!err){
                console.log(res.length,pageSize);
                response.send({'error':0,'data':res,'totalPage':parseInt(res.length/pageSize),'totalCount':res.length});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        });
    });

    app.get('/ent/provider/detail/:id',function(request,response){
        response.contentType('json');
        ProviderCtrl.detail(request.params.id,function(err,res){
            if(!err){
                response.send({'error':0,'data':res});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        })
    });


    app.post('/ent/provider/member/create',function(request,response){
        response.contentType('json');
        MemberCtrl.create(request.body,function(err,res){
            if(!err){
                response.send({'error':0});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        });
    });

    app.post('/ent/provider/member/update/:id',function(request,response){
        response.contentType('json');
        MemberCtrl.update(request.params.id,request.body,function(err,res){
            if(!err){
                response.send({'error':0});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        })
    });

    app.get('/ent/provider/member/list',function(request,response){
        var page = request.query.page===undefined?0:request.query.page;
        var pageSize = request.query.pageSize===undefined?25:request.query.pageSize;
        var mobile = request.query.mobile;
        var name = request.query.name;
        var email = request.query.email;
        var providerID = request.query.providerID;
        var isEnable = request.query.isEnable;
        MemberCtrl.list(page,pageSize,mobile,name,email,providerID,isEnable,function(err,res){
            if(!err){
                response.send({'error':0,'data':res,'totalPage':parseInt(res.length/pageSize),'totalCount':res.length});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        });
    });

    app.get('/ent/provider/member/detail/:id',function(request,response){
        response.contentType('json');
        MemberCtrl.detail(request.params.id,function(err,res){
            if(!err){
                response.send({'error':0,'data':res});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        })
    });

    app.post('/product/:productType/create',function(request,response){
        response.contentType('json');
        ProductCtrl.create(request.params.productType,request.body,function(err,res){
            if(!err){
                response.send({'error':0});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        });
    });

    app.get('/product/:productType/list',function(request,response){
        response.contentType('json');
        var page = request.query.page===undefined?0:request.query.page;
        var pageSize = request.query.pageSize===undefined?25:request.query.pageSize;
        var name = request.query.name;
        var cityID = request.query.providerID;
        var effectDate = request.query.effectDate;
        var expiryDate = request.query.expiryDate;
        var isEnable = request.query.isEnable;

        ProductCtrl.list(request.params.productType,page,pageSize,name,cityID,effectDate,expiryDate,isEnable,function(err,res){
            if(!err){
                console.log(res.length,pageSize);
                response.send({'error':0,'data':res,'totalPage':parseInt(res.length/pageSize),'totalCount':res.length});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        });
    });

    app.get('/product/:productType/detail/:id',function(request,response){
        response.contentType('json');
        ProductCtrl.detail(request.params.id,function(err,res){
            if(!err){
                response.send({'error':0,'data':res});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        });
    });

    app.post('/product/:productType/update/:id',function(request,response){
        response.contentType('json');
        ProductCtrl.update(request.params.id,request.body,function(err,res){
            if(!err){
                response.send({'error':0});
            } else {
                response.send({'error':1,'errorMsg':err});
            }
        })
    });

};