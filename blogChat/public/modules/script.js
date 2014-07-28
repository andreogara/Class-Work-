(function(customVar, $, undefined){
var socket = io.connect("ws://localhost:7080");
var customVar.validate = function()
{
console.log("action received");
	var name = $('#name').val();
	var message = $('#message').val();
	$('#message').val("");
	$('#name').val("");
	if ((name != "") && (message != "") ){
		socket.emit("send", {name: name, message: message});
		$("#info").css('visibility', 'visible');
		setTimeout(function(){
			$("#info").css('visibility', 'hidden');
			}, 3000);
	}
	else
	{
		alert("Fill out all the fields!");
	}
};

$("#message").keydown(function(){
  $("message").css("background-color","yellow");
});

socket.on("news", function(data){
	$('#messages').append("<div class='msg'>"+data.name+":<br/>"+data.message+"</div>");
});

socket.on("fill", function(data){
	
	$('#messages').append("<div class='msg'>"+data.name+":<br/>"+data.message+"</div>");

});

socket.emit('populate', {});

window.onload=function(){ 
if( $('#messages').is(':empty') ) {

	}
};

$(document).ready(function(){
  $("#message").blur(function(){
  
  if( $('#message').val() == "" ) {
    $('#message').css('height', '25px');
	}

  });
  
  $("#message").focus(function(){
    $('#message').css('height', '150px');
  });
  
 $( "#message" ).keydown(function() {
	if ($("#message").val().length > 300){
		$("#message").css("background-color", "#FF0000");
		$("#message").css("color", "#000000");
		$('button').prop('disabled', true);
		//disable button and display error and change colour
	}
	
	if ($("#message").val().length < 300){
		$("#message").css("background-color", "pink");
        $('button').prop('disabled', false);
		//disable button and display error and change colour
	}
});
  
});

})(window.customVar = window.customVar || {}, jQuery);



