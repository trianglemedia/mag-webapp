var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var toobusy = require('toobusy');
require('node-jsx').install({extension: '.react'});

var app = express();
//TODO
app.locals.appTitle = "Triangle";

app.use(function (req, res, next) {
    if (toobusy()) {
        res.status(503);
        return;
    }
    next();
});



// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('react', require('./reactengine').__express);
app.set('view engine', 'react');

app.use(function (req, res, next) {
    if (req.session && req.session.admin)
        res.locals.admin = true;
    next();
});

//authorization
var authorize = function (req, res, next) {
    if (req.session && req.session.admin)
        return next();
    else
        return res.send(401);
};

// development only
if ('development' == app.get('env')) {
    //    app.use(express.errorHandler());
    app.use('/',express.static(path.join(__dirname, '..', '.build')));
}


app.use('/', routes);


app.use(function (req, res, next) {
    res.status(404);
    res.send("");
});
// http.createServer(app).listen(app.get('port'), function(){
// console.log('Express server listening on port ' + app.get('port'));
// });

var server = http.createServer(app);
var boot = function () {
    server.listen(app.get('port'), function () {
        console.info('Express server listening on port ' + app.get(
            'port'));
    });
}
var shutdown = function () {
    server.close();
}
if (require.main === module) {
    boot();
} else {
    console.info('Running app as a module')
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}