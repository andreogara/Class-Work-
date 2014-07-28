var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res) {

	var id = 'none';
	var language = 'en';
	res.render('blog/basic', { title: 'All Blogs' , language: language, id: id});
});

router.get('/view/:id', function(req, res) {

	var id = req.params.id || 'none';
	var language = req.query.lang || 'en';
	
	
	
	database.find( {_id: id}, function(err, docs){
		if (docs || docs[0]){
		
	    res.render('blog/basic', { name: docs[0].name , rank : docs[0].rank, id: id});

	}
	});
});

router.get('/create', function(req, res) {

	var message = req.body.text;
	//will need to save something here
    res.send('create OK!');
});

router.post('/save', function(req, res) {

    var messageToSave = req.body.blogMessage || 'none';
	
	
});

module.exports = router;