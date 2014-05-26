var iosocket = io.connect(window.location.hostname);
 
iosocket.on('connect', function () {
    $('#incomingChatMessages').append($('<li>Connected</li>'));
});

iosocket.on('message', function(message) {
   $('#incomingChatMessages').append($('<li></li>').text(message));
});

iosocket.on('disconnect', function() {
    $('#incomingChatMessages').append('<li>Disconnected</li>');
});
            

$(function(){
    $('#outgoingChatMessage').keypress(function(event) {
        if(event.which == 13) {
            var msg = $('#outgoingChatMessage').val();
            iosocket.emit('message', msg);
            //$('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));
            $('#outgoingChatMessage').val('');
        }
    });
});
