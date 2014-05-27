/*
 * Variablen / Requires (läd Module)
 */
var http = require('http'); 
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var methodOverride = require('method-override');

/*
 * Variablen Datenbank und Routing
 * Verbindnen mit mongolab DB, falls nicht möglich lokalen fallback benutzen
 * ToDo: hardcoded Zugangsdaten maskieren
 */

var dbConnectString = 'mongodb://testUser:test@ds053128.mongolab.com:53128/webserver' || 'localhost:27017/webserver';
// if(process.env.OPENSHIFT_MONGODB_DB_URL){
//   dbConnectString = process.env.OPENSHIFT_MONGODB_DB_URL + 'webserver';
// }
var db = monk(dbConnectString);

var routes = require('./routes/index');
var session = require('./routes/session');
var login = require('./routes/login');
var data = require('./routes/data');

/*
 * Instanziieren und konfigurieren von Express
 */
var app = express();
//var server = http.createServer(app);
//var io = socketio.listen(server);
// server.listen(3001);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'jade');
app.use(methodOverride());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/', session);
app.use('/', login);
app.use('/', data);

/*
 * Error Handler
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*
 * Error Handler Development
 * Ausgabe inkl. stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/*
 * Error Handler Einsatz
 * keine stacktrace Ausgabe
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

//websocket socket.io
// var Room = io
//   .of('/room')
//   .on('connection', function(socket) {
//     var joinedRoom = null;
//     socket.on('join room', function(data) {
//       socket.join(data);
//       joinedRoom = data;
//       socket.emit('joined', "you've joined " + data);
//       socket.broadcast.to(joinedRoom)
//                          .send('someone joined room');
//     }); 
//     socket.on('fromclient', function(data) {
//       if (joinedRoom) {
//         socket.broadcast.to(joinedRoom).send(data);
//       } else {
//         socket.send(
//            "you're not joined a room." +
//            "select a room and then push join."
//         );
//       }
//     });
//   });



