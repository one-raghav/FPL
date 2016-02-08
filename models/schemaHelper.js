var CounterModel = require('./counterModel');
var _ = require("underscore");

module.exports = {
	// auto increment id for hooked models
	getCounterHook: function(modelName) {
		return function(next) {
			var hookedModel = this;
			CounterModel.findByIdAndUpdate({
				_id: modelName
			}, {
				$inc: {
					seq: 1
				}
			}, function(error, counter) {
				if (error)
					return next(error);
				if (counter) {
					hookedModel._id = counter.seq;
					next();
				} else {
					(new CounterModel({
						_id: modelName,
						seq: 0
					})).save(function(err, doc) {
						hookedModel._id = doc.seq;
						next();
					});
				}
			});
		}
	},
	makeAllFieldsRequired: function(schema) {
		var keys = _.keys(schema);

		keys.forEach(function(key) {
			if (key === "_id") {
				return;
			}
			var value = schema[key];
			if (typeof value === 'object') {
				schema[key].required = true
			} else {
				schema[key] = {
					"type": value,
					"required": true
				};
			}
		});
		return schema;
	}
}