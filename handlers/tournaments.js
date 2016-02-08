var models = require('../models/models.js');
var BaseHandler = require("./BaseHandler.js");

var TournamentsHandler = function(model) {
	this.model = model;
}

require('util').inherits(TournamentsHandler, BaseHandler);

TournamentsHandler.prototype.findUpComing = function(req, resp) {
	this.findAll(req, resp, null, {
		startDate: {
			"$gte": new Date()
		}
	});
};
TournamentsHandler.prototype.findPast = function(req, resp) {
	this.findAll(req, resp, null, {
		endDate: {
			"$lte": new Date()
		}
	});
};

module.exports = new TournamentsHandler(models["tournament"]);