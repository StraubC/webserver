var myGame = new Object();	// Spiel Objekt

$(document).ready(function(){
	init();	
	
});

function init(){

		
	var gameIDar = window.location.pathname.split(':');
	var id = gameIDar[1].replace(/:/g,"").replace(/\s/g,"");
	
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
		
		myGame.gameID = id;
		myGame.nPlayers = 2;
				
		
		$("#test1").append(myGame.gameName + "//" + myGame.gamePW + " --- " + myGame.gameID +  " --- " + myGame.nPlayers);
		
		
	});
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
