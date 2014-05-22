/*
 * Routes für alle login Bezogenen Datenbankzugriffe
 */

var express = require('express');
var router = express.Router();

/*
 * POST Login anlegen
 */

router.post('/loginCreate', function(req, res){
  var db = req.db;
  var collection = db.get('logincollection');
  var name = req.body.userName;
  var pw = req.body.userPw;

  collection.insert({
    "name" : name,
    "pw" : pw },
    function(err, doc){
      if(err){
        // return: Fehlermeldung
        res.send("Fehler beim hinzufügen der Daten in die Datenbank.");
      }
      else{
      	//ToDo: kurze Bestätigung dass account angelegt wurde
        //return: Weiterleiten auf die login Seite
        res.redirect("login");
      }
  });
});

router.post('/login', function(req, res){
  var db = req.db;
  var collection = db.get('logincollection');
  var loginName = req.body['loginName'];
  var loginPw = req.body['loginPw'];
  var id ="";

  collection.findOne({ name: loginName}, function(err, doc){
    if(loginPw.toString() === doc.pw){
    	// ToDo: session coockie anlegen.
      // return: Login bestätigt, Weiterleitung auf home Seite
      res.redirect("home");
    }
    else{
      // ToDo: Fehlermeldung falsches Passwort
      //return: Falsche Login Informationen, Weiterleitung zurück auf login Seite
      res.redirect("login");
    }
  });
});

module.exports = router;
