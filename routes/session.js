/*
 * Routes für alle sessionbezogenen Datenbankanfragen
 */

var express = require('express');
var router = express.Router();

/*
 * GET Liste aller Sessions
 * returns: Array aller Einträge in der Collection 'sessionCollection' der Datenbank 'webserver' als JSON Objekte
 */

router.get('/sessionList', function(req, res){
  var db = req.db;
  var collection = db.get('sessioncollection');
  collection.find({},{}, function(err, doc){
    res.send(doc);
  });
});


/*
 * GET Session by ID
 */

router.get('/sessionById/:id', function(req, res){
  var db = req.db;
  var collection = db.get('sessioncollection');
  var id = req.params.id.replace(/:/g,"").replace(/\s/g,"");
  
  collection.findById(id, function(err, doc){
    res.send(doc);
  });
});

/*
 * GET Session by name
 */

router.get('/sessionByName/:name', function(req, res){
  var db = req.db;
  var collection = db.get('sessioncollection');
  var findName = req.params.name.replace(/:/g,"").replace(/\s/g,"");
  
  collection.find({ name: findName}, function(err, doc){
    res.send(doc);
  });
});

/*
 * POST Session anlegen
 */

router.post('/sessionSetup', function(req, res){
  var db = req.db;
  var collection = db.get('sessioncollection');
  var name = req.body.sessionName;
  var pw = req.body.sessionPw;

  collection.insert({
    "name" : name,
    "pw" : pw },
    function(err, doc){
      if(err){
        // return: Fehlermeldung
        res.send("Fehler beim hinzufügen der Daten in die Datenbank.");
      }
      else{
        //return: Weiterleiten auf die sessionMaster Seite
        res.redirect("sessionMaster");
      }
  });
});

/*
 * POST Session beitreten
 */

router.post('/sessionClient', function(req, res){
  var db = req.db;
  var collection = db.get('sessioncollection');
  var sessionName = req.body['sessionName'];
  var sessionPw = req.body['sessionPw'];
  var id ="";

  collection.findOne({ name: sessionName}, function(err, doc){
    if(sessionPw.toString() === doc.pw){
      // return: Login bestätigt, Weiterleitung auf sessionClient Seite
      res.redirect("sessionClient");
    }
    else{
      // ToDo: Fehlermeldung falsches Passwort
      //return: Falsche Login Informationen, Weiterleitung zurück auf joinSession Seite
      res.redirect("joinSession");
    }
  });
});


module.exports = router;
