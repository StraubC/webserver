/*
 * Routes für alle Seitenzugriffe
 */

var express = require('express');
var router = express.Router();

/*
 * GET index page.
 */

router.get('/', function(req, res){
  res.render('index.html', { title: 'Home', loggedIn: req.session.loggedIn, login: req.session.userName });
});

router.get('/home', function(req, res){
  res.render('index.html', { title: 'Home', loggedIn: req.session.loggedIn, login: req.session.userName });
});

router.get('/index', function(req, res){
  res.render('index.html', { title: 'Home', loggedIn: req.session.loggedIn, login: req.session.userName });
});

/*
 * GET data page.
 */

router.get('/dataPage', function(req, res){
  res.render('data.html', { title: 'Data', loggedIn: req.session.loggedIn, login: req.session.userName });
});


/*
 * GET Session Page
 */

router.get('/session', function(req, res){
  res.render('session.html', { title: 'Session', loggedIn: req.session.loggedIn, login: req.session.userName });
});

/*
 * GET create Session page.
 */

router.get('/createSession', function(req, res){
  res.render('createSession.html', { title: 'Session erstellen', loggedIn: req.session.loggedIn, login: req.session.userName });
});

/*
 * GET join Session page.
 */

router.get('/joinSession', function(req, res){
  res.render('joinSession.html', { title: 'Session beitreten', loggedIn: req.session.loggedIn, login: req.session.userName });
});


/*
 * GET Chat page.
 */

router.get('/chat', function(req, res){
  res.render('chat.html', { title: 'Chat', loggedIn: req.session.loggedIn, login: req.session.userName });
});

/*
 * GET Session Master page.
 */

router.get('/sessionMaster', function(req, res){
  res.render('sessionMaster.html', { title: 'Master', loggedIn: req.session.loggedIn, login: req.session.userName });
});

/*
 * GET Session Client page.
 */

router.get('/sessionClient', function(req, res){
  res.render('sessionClient.html', { title: 'Client', loggedIn: req.session.loggedIn, login: req.session.userName });
});

/*
 * GET Login page.
 */

router.get('/login', function(req, res){
  res.render('login.html', { title: 'Login', loggedIn: req.session.loggedIn, login: req.session.userName});
});

module.exports = router;

