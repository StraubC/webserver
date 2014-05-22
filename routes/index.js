/*
 * Routes für alle Seitenzugriffe
 */

var express = require('express');
var router = express.Router();

/*
 * GET index page.
 */

router.get('/', function(req, res){
  res.render('index.html', { title: 'Home' });
});

router.get('/home', function(req, res){
  res.render('index.html', { title: 'Home' });
});

router.get('/index', function(req, res){
  res.render('index.html', { title: 'Home' });
});

/*
 * GET create Session page.
 */

router.get('/createSession', function(req, res){
  res.render('createSession.html', { title: 'Session erstellen' });
});

/*
 * GET join Session page.
 */

router.get('/joinSession', function(req, res){
  res.render('joinSession.html', { title: 'Session beitreten' });
});


/*
 * GET Chat page.
 */

router.get('/chat', function(req, res){
  res.render('chat.html', { title: 'Chat' });
});

/*
 * GET Session Master page.
 */

router.get('/sessionMaster', function(req, res){
  res.render('SessionMaster.html', { title: 'Master' });
});

/*
 * GET Session Client page.
 */

router.get('/sessionClient', function(req, res){
  res.render('sessionClient.html', { title: 'Client' });
});

/*
 * GET Login page.
 */

router.get('/login', function(req, res){
  res.render('login.html');
});

module.exports = router;

