var tournaments = require('../../handlers/tournaments.js');

module.exports = [{
		"method": "post",
		"path": "/tournaments",
		"handler": tournaments,
		"handlerMethod": "create",

	}, {
		"method": "put",
		"path": "/tournaments/:id",
		"handler": tournaments,
		"handlerMethod": "updateById"

	}, {
		"method": "delete",
		"path": "/tournaments/:id",
		"handler": tournaments,
		"handlerMethod": "deleteById"
	}, {
		"method": "get",
		"path": "/tournaments",
		"handler": tournaments,
		"handlerMethod": "findAll"
	}, {
		"method": "get",
		"path": "/tournaments/upcoming",
		"handler": tournaments,
		"handlerMethod": "findUpComing"
	}, {
		"method": "get",
		"path": "/tournaments/past",
		"handler": tournaments,
		"handlerMethod": "findPast"
	}, {
		"method": "get",
		"path": "/tournaments/:id",
		"handler": tournaments,
		"handlerMethod": "findById"
	}
];