var games = require('../../handlers/games.js');

module.exports = [{
		"method": "post",
		"path": "/games",
		"handler": games,
		"handlerMethod": "create",

	}, {
		"method": "put",
		"path": "/games/:id",
		"handler": games,
		"handlerMethod": "updateById"

	}, {
		"method": "delete",
		"path": "/games/:id",
		"handler": games,
		"handlerMethod": "deleteById"
	}, {
		"method": "get",
		"path": "/games",
		"handler": games,
		"handlerMethod": "findAll"
	}, {
		"method": "get",
		"path": "/games/upcoming",
		"handler": games,
		"handlerMethod": "findUpComing"
	}, {
		"method": "get",
		"path": "/games/past",
		"handler": games,
		"handlerMethod": "findPast"
	}, {
		"method": "get",
		"path": "/games/tournament/:id",
		"handler": games,
		"handlerMethod": "findGamesByTournamentId"
	},
	{
		"method": "get",
		"path": "/games/:id",
		"handler": games,
		"handlerMethod": "findById"
	}

];