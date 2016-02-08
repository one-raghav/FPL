var models = require('../models/models.js');
var BaseHandler = require("./BaseHandler.js");

var TeamsHandler = function(model) {
	this.model = model;
}

require('util').inherits(TeamsHandler, BaseHandler);

module.exports = new TeamsHandler(models["team"]);