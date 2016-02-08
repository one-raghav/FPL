var models = require('../models/models.js');
var BaseHandler = require("./BaseHandler.js");

var GamesHandler = function(model) {
	this.model = model;
}

require('util').inherits(GamesHandler, BaseHandler);

GamesHandler.prototype.findUpComing = function(req, resp) {
	this.findAll(req, resp, null, {
		date: {
			"$gte": new Date()
		}
	});
};
GamesHandler.prototype.findPast = function(req, resp) {
	this.findAll(req, resp, null, {
		date: {
			"$lte": new Date()
		}
	});
};

GamesHandler.prototype.findGamesByTournamentId = function(req, resp) {
	var tid = req.params.id;
	if (tid) {
		this.findAll(req, resp, null, {
			tournamentId: tid
		});
	} else {
		resp.send({'status':'error',message:'missing tournament id'});
	}

};

module.exports = new GamesHandler(models["game"]);