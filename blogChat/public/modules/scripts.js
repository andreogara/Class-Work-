(function (customVars, $, undefined){
var socket = io.connect("ws://localhost:7080");
customVars.show = function(){
	var name = $('#name').val();
	var message = $('#message').val();
	$('#message').val("");
	if ((name != "") && (message != "") ){
		var time = new Date();
		socket.emit("send", {name: name, message: message, time: time});
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

socket.on("news", function(data){
	$('#messages').append("<div class='msg'><strong>"+data.name+":</strong><br/>"+data.message+"</div>");
});

socket.on("fill", function(data){
    var msgLength = $("#messages > div").length;
	$('#messages').append("<div class='msg'><strong>"+data.name+":</strong><br/>"+data.message+"</div>");

});

socket.on("intro", function(data){
console.log("filling the welcome page now");
	$('#welcome').append("<div class='msg'><strong>"+data.name+" </strong> said <br/>"+data.message+" at <br/>" +data.time+"</div>");
});

socket.emit('populate', {});
socket.emit('welcome', {});

$(document).ready(function(){
  $("#message").blur(function(){
  
  if( $('#message').val() == "" ) {
    $('#message').css('height', '25px');
	$("#message").css("background-color", "#FFFFFF");
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
		$("#error").css('visibility', 'visible');
	    $("#error").css('color', 'red');
		//disable button and display error and change colour
	}
	if ($("#message").val().length < 300){
		$("#message").css("background-color", "#F5F5DC");
        $('button').prop('disabled', false);
		$("#error").css('visibility', 'hidden');

	}
});
});
})(window.customVars = window.customVars || {}, jQuery);

