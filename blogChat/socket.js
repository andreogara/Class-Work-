var connect = require("connect");
connect.createServer(connect.static(__dirname)).listen(80);

var io = require("socket.io").listen(7080);
 io.sockets.on("connection", function (socket) {
 socket.emit("news", {newsItem : "Serena will surpass all records..."});
 
 socket.on("hello", function(data){
		socket.emit("news", {newsItem : "She is winning Roland garros this year!!!"})
	});

 
 });
 
 	