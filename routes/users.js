var express = require('express');
var router = express.Router();
var usersHandler = require('../handlers/users.js');

/* GET users listing. */
router.get('/', function(req,resp){
	usersHandler.getUsers(req,resp);
});

router.post('/authenticate', function(req,resp){
	usersHandler.authenticate(req,resp);
});



module.exports = router;
