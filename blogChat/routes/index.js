var express = require('express');
var database = require('../database')
var io = require("socket.io").listen(7080);
var router = express.Router();
io.sockets.on("connection", function (socket) {
socket.on('send', function (data) {
        io.sockets.emit('news', data);
		database.insert({name: data.name, message: data.message, time: data.time}, function(err,doc){
});
    });

socket.on('populate', function(data){
database.find({}).sort({ time: -1 }).exec(function (err, docs) {
	if (docs.length>=1){
		for (var i = 0; i < docs.length; i++){
			socket.emit("fill", {name: docs[i].name, message: docs[i].message});	
		}
	}
	else{
		console.log("nothing for you now");
	}
});
});

socket.on('welcome', function(data){
database.find({}).limit(5).sort({ time: -1 }).exec(function (err, docs) {
	if (docs.length>=1){
		for (var i = 0; i < docs.length; i++){
			socket.emit("intro", {name: docs[i].name, message: docs[i].message, time: docs[i].time});	
		}
	}
	else{
		console.log("nothing for you now");
	}
});
});
	
});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Intl Students'});
});
module.exports = router;
