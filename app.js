/*
 * Variablen Requires
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


/*
 * Variablen Datenbank und Routing
 * Wenn Ausführung in der Openshift Umgebung deren db Zugang benutzen, sonst lokal
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
var server = http.createServer(app);
var socketio = require('socket.io').listen(server);
server.listen(3001);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'jade');

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

socketio.sockets.on('connection', function (socket) {
    socket.on('room', function (data) {
        console.log('Room: ', data.room);
        socket.join(data.room);
    });

    socket.on('msg', function (data) {
      socketio.sockets.in(data.room).emit('message', data.msg);
      console.log(data.room + data.msg);
    });
});

socketio.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socketio.sockets.emit('message', msg);
    });
});

// app.get('/', routes.index);
// app.get('/createGame', routes.createGame);
// app.get('/joinGame', routes.joinGame);
// app.get('/howTo', routes.howTo);
// app.get('/gameMaster/:id', routes.gameMaster);
// app.get('/gameClient/:id', routes.gameClient);
// app.get('/jsonGame', routes.jsonGame);
// app.get('/gameByID/:id', routes.gameByID);

// app.post('/gameSetup', routes.gameSetup);
// app.post('/joinGame', routes.joinGamePost);

