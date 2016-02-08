var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaHelper = require("./schemaHelper.js");

//register schema
var models = ['game', 'team', 'tournament','user'];

var exports = {};

models.forEach(function(model) {
	var schema = new Schema(schemaHelper.makeAllFieldsRequired(require('./' + model + '.json')));
	// 
	schema.pre("save", schemaHelper.getCounterHook(model));
	exports[model] = mongoose.model(model, schema);
});

module.exports = exports;