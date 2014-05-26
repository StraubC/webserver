$(document).ready(function(){
	
	$('#create').click(function(){

	    $("#createBox").show(500);
	    $("#joinBox").hide(500);
	});

	$('#join').click(function(){

	    $("#createBox").hide(500);
	    $("#joinBox").show(500);
	});

});

