
/**
 * Module dependencies.
 */

var express = require('express');
var index = require('./routes/index');
var http = require('http');
var path = require('path');
var log4js = require('log4js');

//log4js config
log4js.configure({
    appenders : [ {
        type : 'console'
    }, {
        type : 'file',
        filename : 'logs/access.log',
        maxLogSize : 1024,
        backups : 4,
        category : 'normal'
    } ],
    replaceConsole : true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(log4js.connectLogger(logger, {
    level : log4js.levels.INFO
}));
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}

index(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
