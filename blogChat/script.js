var show = function(){
console.log("Works fine now");
};
var socket = io.connect("ws://localhost:7080");
socket.on("news", function(data){
	$('#log').append("In todays news, "+data.newsItem);
});
sayHiToServer = function(){
socket.emit("hello", {});
};