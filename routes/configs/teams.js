var teams = require('../../handlers/teams.js');

module.exports = [{
		"method": "post",
		"path": "/teams",
		"handler": teams,
		"handlerMethod": "create",

	}, {
		"method": "put",
		"path": "/teams/:id",
		"handler": teams,
		"handlerMethod": "updateById"

	}, {
		"method": "delete",
		"path": "/teams/:id",
		"handler": teams,
		"handlerMethod": "deleteById"
	}, {
		"method": "get",
		"path": "/teams",
		"handler": teams,
		"handlerMethod": "findAll"
	}, {
		"method": "get",
		"path": "/teams/:id",
		"handler": teams,
		"handlerMethod": "findById"
	}

];