/*
 * Routes für alle 'data' Datenbankanfragen
 */

var express = require('express');
var router = express.Router();

/*
 * GET Liste aller Einträge
 * returns: Array aller Einträge in der Collection 'datacollection' der Datenbank 'webserver' als JSON Objekte
 */

router.get('/data', function(req, res){
  var db = req.db;
  var collection = db.get('datacollection');
  collection.find({},{}, function(err, doc){
    res.send(doc);
  });
});

/*
 * POST data anlegen
 */

router.post('/data', function(req, res){
  var db = req.db;
  var collection = db.get('datacollection');
  var name = req.body.dataName;
  var val1 = req.body.dataVal1;

  collection.insert({
    "name" : name,
    "value1" : val1 },
    function(err, doc){
      if(err){
        // return: Fehlermeldung
        res.send("Fehler beim hinzufügen der Daten in die Datenbank.");
      }
      else{
        //return: Weiterleiten auf die data Seite
        res.redirect("dataPage");
      }
  });
});


/*
 * GET data by ID
 * Select Where id
 */

router.get('/data/:id', function(req, res){
  var db = req.db;
  var collection = db.get('datacollection');
  var id = req.params.id.replace(/:/g,"").replace(/\s/g,"");
  
  collection.findById(id, function(err, doc){
    res.send(doc);
  });
});

/*
 * GET data by name
 * Select Where name
 */

router.get('/data/byName/:name', function(req, res){
  var db = req.db;
  var collection = db.get('datacollection');
  var findName = req.params.name.replace(/:/g,"").replace(/\s/g,"");
  
  collection.find({ name: findName}, function(err, doc){
    res.send(doc);
  });
});

/*
 * PUT data by id
 * Update Where id
 */






module.exports = router;
