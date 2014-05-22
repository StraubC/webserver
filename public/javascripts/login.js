$(document).ready(function() {	
  
  $('#switchButton').click(function(){

    if ($(this).text()=="zur Anmeldung"){
      $(this).text("zum Login");
      $("#loginSection").hide(500);
      $("#createSection").show(500);
    }

    else {
      $(this).text("zur Anmeldung");
      $("#loginSection").show(500);
      $("#createSection").hide(500);
    }
  });
});
