var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

// register routes configs here
var apis = ['games', 'teams', 'tournaments'];


apis.forEach(function(api) {
	var apiConfig = require("./configs/" + api + ".js");
	apiConfig.forEach(function(endPoint) {
		router[endPoint.method](endPoint.path, function(req, resp) {
			endPoint.handler[endPoint.handlerMethod](req, resp)
		});
	});
});



module.exports = router;