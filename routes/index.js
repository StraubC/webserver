// var Mongo = require('mongodb');
// var MongoClient = Mongo.MongoClient;
// var BSON = Mongo.BSONPure;
// var assert = require('assert');

var express = require('express');
var router = express.Router();

/*
 * GET home page.
 */


router.get('/', function(req, res){
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
 * GET How To page.
 */

router.get('/howTo', function(req, res){
  res.render('howTo.html', { title: 'How To' });
});

/*
 * GET Session Master page.
 */

router.get('/sessionMaster', function(req, res){
  res.render('SessionMaster.html', { title: 'Master' });
});


/*
 * GET Game by ID
 */
// exports.gameByID = function(req, res){
//   var id = req.params.id.replace(/:/g,"").replace(/\s/g,"");
//   console.log('Retrieving game: ' + id);
//   MongoClient.connect("mongodb://localhost:27017/pokerdb", function(err, db) {
//     db.collection('game', function(err, collection) {
//       //collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
//       collection.findOne({_id : BSON.ObjectID.createFromHexString(id)}, function(err, item){
//         res.send(item);
//       });
//     });
//   });
// };

// router.get('/sessionById', function(req, res){
//   var db = req.db;
//   var collection = 
//   var id = req.params.id.replace(/:/g,"").replace(/\s/g,"");
//   console.log('Retrieving game: ' + id);
//   MongoClient.connect("mongodb://localhost:27017/webserver", function(err, db) {
//     db.collection('game', function(err, collection) {
//       //collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
//       collection.findOne({_id : BSON.ObjectID.createFromHexString(id)}, function(err, item){
//         res.send(item);
//       });
//     });
//   });
// };


//   );


// exports.jsonGame = function(req, res){
// 	var game;
// 	MongoClient.connect("mongodb://localhost:27017/pokerdb", function(err, conn) {
//   	if(!err) {
//       conn.collection('game', function(err, coll){
//         coll.find(function(err, cursor) {
//           cursor.toArray(function(err, items) {
//             res.writeHead(200, {
//               "Content-Type": "application/json",
//               "Access-Control-Allow-Origin": "*"
//             });
//             res.end(JSON.stringify(items));
//           });
//         });
//       });		
//  		}	
// 	});
// };

/*
 * GET Game Client page.
 */

router.get('/sessionClient', function(req, res){
  res.render('sessionClient.html', { title: 'Client' });
});


/*
 * POST game Setup.
 */

// exports.gameSetup = function(req, res){

	
// 	var name = req.body['gameName'];
// 	var pw = req.body['gamePw'];	
//   var gameID = "";
	
  
// 	MongoClient.connect("mongodb://localhost:27017/pokerdb", function(err, db) {
//   		if(!err) {
//     		console.log("We are connected");
//     		var collection = db.collection('game');
//     		collection.insert({'name': name, 'pw': pw}, {safe:true}, function(err, result) {
//             if (err) {
//               res.send({'error':'An error has occurred'});
//             } 
//             else {
//               gameID = result[0]._id;
//               var redirectID = "/gameMaster/:" + gameID;
//               res.redirect(redirectID);
              
//               console.log('Success: ' + JSON.stringify(result[0]));
              
              
//             }
//         });
//  		}	
// 	});
  
  
// };

/*
 * POST join Game.
 */

// exports.joinGamePost = function(req, res){
//   var gName = req.body['gameName'];
//   var pw = req.body['gamePw'];  
//   var gameID = "";

//   MongoClient.connect("mongodb://localhost:27017/pokerdb", function(err, db) {
//       if(!err) {
//         console.log("We are connected");
//         var collection = db.collection('game');
//         collection.findOne({name: gName}, {fields:{name: 1, pw:1}}, (function(err, result) {
//             if (err) {
//               res.send({'error':'An error has occurred'});
//             } 
//             else {
//               assert.equal(gName, result.name);
//               gameID = result._id;
//               var redirectID = "/gameClient/:" + gameID;
//               res.redirect(redirectID);
//               // ToDo: Passwort überprüfen!
//               console.log('Success: ' + JSON.stringify(result.name));
              
              
//             }
//         }));
//     } 
//   });
  
// };

module.exports = router;

