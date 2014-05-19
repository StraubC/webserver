var gameStatus = 0;		// pausiert = 0, aktiv = 1
var stack = new Array(52);	// Kartenstapel
var myGame = new Object();	// Spiel Objekt


Array.prototype.shuffle = function() {
	var s = [];
	while (this.length) 
		s.push(this.splice(Math.random() * this.length, 1));
	while (s.length) 
		this.push(s.pop());
	return this;

}

// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}



$(document).ready(function(){
	
	init();	
	

});

function game(id){
	
	$.getJSON('../gameByID/' + id, function(data){
		
		$.each(data, function(index, item){
			if(index == "name"){
				//$("#test3").append(item).append(" // ");
				myGame.gameName = item;
			}
			if(index == "pw"){
				//$("#test3").append(item);
				myGame.gamePW = item;
			}

		});
		
		//var tmpGame = jQuery.parseJSON(data);
		//myGame.gameName = tmpGame.name;
		//myGame.gamePW = tmpGame.pw;
		myGame.gameID = id;
		myGame.nPlayers = 2;
		/************ ToDo *************
		 * Spieler registrieren        *
		 *******************************/

		gameStatus = 1;
		gameLoop();
		
		//$("#test3").append(this.gameID);
		//$("#test3").append(this.nPlayers);
		//var obj = jQuery.parseJSON(data[0]);
		//var testText2 = obj.gameID + obj.gameName + obj.gamePW + obj.nPlayers;
		//$("#test2").text(JSON.stringify(obj));	

		/*this.gameID = id;
		this.gameName = obj.name;
		this.gamePW = obj.pw;
		this.nPlayers = 0;
		*/
		/*$.each(data, function(k, v){
			if(k == "name")
				this.gamName = v;
			if(k == "pw")
				this.gamePW = v;
		});*/
		
	});

}


function init(){

	//var myGame = new game(pseudoID, pseudoName, pseudoPW, pseudoNPlayers); 	
	var gameIDar = window.location.pathname.split(':');
	var gameID = gameIDar[1].replace(/:/g,"").replace(/\s/g,"");
	
	var img = new Image(), 
    	canvas = document.getElementById('tableCan');
	img.src = "../images/table_empty.jpg";

	img.onload = function(){
	    if (canvas.getContext) {
	         var ctx = canvas.getContext('2d');
	         ctx.drawImage(img, 0, 0);
	    }
	};


	 		// Array welches den Kartenstapel sortiert enthält

	/* 
	 * A= Ace, K = King, Q = Queen, J = Jack, 2 = 2, etc.
	 * s = Spades (Pik), h = Hearts (Herz), d = Diamonds (Karo), c = Clubs (Kreuz)
	 */								

	stack = [	"2s", "2h", "2d", "2c", "3s", "3h", "3d", "3c", "4s", "4h", "4d", "4c", "5s", "5h", "5d", "5c", 
	 			"6s", "6h", "6d", "6c", "7s", "7h", "7d", "7c", "8s", "8h", "8d", "8c", "9s", "9h", "9d", "9c",
	 			"10s", "10h", "10d", "10c", "Js", "Jh", "Jd", "Jc", "Qs", "Qh", "Qd", "Qc", "Ks", "Kh", "Kd", "Kc",
	 			"As", "Ah", "Ad", "Ac"];
	
	game(gameID);	
	
}

function gameLoop(){
	
	/*$("#table").drawImage({
		source: "../images/table_empty.jpg",
		x: 400, y: 300
		
	});*/
	/*$("#tableCan")[0].getContext('2D').drawImage({
		source: "../images/table_empty.jpg",
		x: 400, y: 300
		
	});*/
	
	/*var canvas = $("tableCan")[0];
	var ctx = canvas.getContext("2d");*/


	/*var img = $('#table');
	if (img.prop('complete')) {
		canvas = $('#tableCan');
		canvas.getContext('2d').drawImage(img, 0, 0, 800, 600);
		this.hide();
	}
	else{
		img.load = function() {
			canvas = $('#tableCan');
			canvas.getContext('2d').drawImage(img, 0, 0, 800, 600);
			this.hide();

		};
	}*/
	

	/*if (img.prop('complete')) {
		var image = document.getElementById("table");
	    var canvas = convertImageToCanvas(image);
	    document.getElementById("tableCan").appendChild(canvas);

	} else {
	    img.load(function() { 
	    	var image = document.getElementById("table");
	    	var canvas = convertImageToCanvas(image);
	     	document.getElementById("tableCan").appendChild(canvas);
	    });
	}
*/
	


	/*var image = new Image();
	image.src = "../images/table_empty.jpg";
	$('#tableCan').drawImage(image, 0, 0)*/

	/*var canvas = $("#tableCan");
	canvas.width = 800;
	canvas.height = 600;
	canvas.getContext("2d").drawImage(image, 0, 0);*/
	
      /*  var c = $('#tableCan')[0];
        c.getContext('2d').drawImage(source: '../images/table_empty.jpg', 0, 0);
*/
    


	
      

	var roundArr = new Array();
	// while nPlayers in Game > 1
	myGame.blind = 100;

	// while (myGame.nPlayers > 1){   
	// 	var myRound = new Object();
	// 	myRound.n = roundArr.length + 1;	// Anzahl Runden

	// 	if(myRound.n == 1)
	// 		myRound.smallBlind = 1;
	// 	else{
	// 		var prev = roundArr[myRound.n-2];
	// 		myRound.smallBlind = (prev.smallBlind + 1) % myGame.nPlayers;
	// 	}
		
	// 	myRound.pot = 0;
		
	// 	********** ToDo ***************
	// 	 * Karten austeilen			    *
	// 	 *******************************

		 
	// 	 var betPlayer = (myRound.SmallBlind + 2) % myGame.nPlayers;
	// 	 // Setzrunde im Flop - false sobald alle gesetzt oder ausgeschieden
	// 	while (true){
	// 		// if nPlayers in Round <= 1
	// 		if(myRound.nPlayers <= 1){
	// 			/*********** ToDo ***************
	// 		 	* Pott an Gewinner übertragen  *
	// 			 ********************************/
	// 			break;
	// 	}		

	// 	}

	// 	roundArr.push(myRound);

	// }  


	stack.shuffle();


	var testText1 = "";
	for (var i = 0; i<=stack.length-1; i++){
		testText1 = testText1 + i + ":" + stack[i] +"  ";
	}
	$("#test1").text(testText1);
	
	$("#test2").append(myGame.gameName + "//" + myGame.gamePW + " --- " + myGame.gameID +  " --- " + myGame.nPlayers);

}



/***************************************
 * Chat                                *
 ***************************************/
var joined = false;
var room = io.connect('/room');

room.on('connect', function() {
	joined = true;
  	room.emit('join room', myGame.gameID);
	$('#inMsg').append($('<li></li>').text('Connected!'));  
  
}); 
 
room.on('joined', function(msg) {
	$('#inMsg').append($('<li></li>').text(msg));
  
});
 
room.on('message', function(msg) {
  	$('#inMsg').append($('<li></li>').text(msg));
});
 
 
$(function(){
    $('#outMsg').keypress(function(event) {
        if(event.which == 13) {
            msg = $('#outMsg').val();
            $('#inMsg').append($('<li></li>').text(msg));
            room.emit('fromclient', msg);
            $('#outMsg').val('');
        }
    });
});




/*
var iosocket = io.connect('http://192.168.0.182:3000');

iosocket.on('connect', function () {
	dataIO.room = myGame.gameID;
    iosocket.emit('room', dataIO.room);
});

iosocket.on('message', function(message) {
   $('#inMsg').append($('<li></li>').text(message));
});

$(function(){
    $('#outMsg').keypress(function(event) {
        if(event.which == 13) {
            dataIO.msg = $('#outMsg').val();
            iosocket.emit('message', dataIO);
            $('#outMsg').val('');
        }
    });
});
*/