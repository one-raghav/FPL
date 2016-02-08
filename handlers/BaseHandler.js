var mongoose = require('mongoose');
var _ = require("underscore");
var userHandler = require('./users.js');

var BaseHandler = function(model) {
	this.model = model;
}

BaseHandler.prototype.findById = function(req, resp) {
	var id = req.params.id;
	if (id) {
		this.model.findOne({
			"_id": id
		}, {
			__v: 0
		}, function(err, doc) {
			resp.send({
				status: err ? "error" : "success",
				message: err,
				data: doc || {}
			});
		})
	} else {
		resp.send({});
	}
};

/*
 * conditions : optional conditions for the find query
 */
BaseHandler.prototype.findAll = function(req, resp, next, conditions) {
	var start = req.query.start || 1;
	var limit = req.query.limit || 1000;
	var conditions = conditions || {};
	this.model.find(conditions, {
		__v: 0
	}, {
		'skip': start - 1,
		'limit': limit,
		'sort': {
			'_id': 1
		}
	}, function(err, doc) {
		if (err) {
			resp.send({
				status: "error",
				message: err
			});
		} else {
			resp.send({
				status: "success",
				message: "success",
				data: doc
			});
		}
	})

};

BaseHandler.prototype.create = function(req, resp) {
	var thisModel = this.model;
	userHandler.verifyToken(req, resp, function(req, resp, next) {
		var doc = req.body;
		var newDoc = new thisModel(doc);
		newDoc.save(function(err, docNew) {
			if (err) {
				console.log(err);
				resp.send({
					status: "error",
					message: err
				});
			} else {
				resp.send({
					status: "success",
					message: "success",
					data:docNew
				});
			}
		});
	});
}

BaseHandler.prototype.updateById = function(req, resp) {
	var thisModel = this.model;
	userHandler.verifyToken(req, resp, function(req, resp) {
		var id = req.params.id;
		var doc = req.body;
		if (id) {
			thisModel.findOneAndUpdate({
				"_id": id
			}, doc, {
				__v: 0,
				new: true
			}, function(err, doc) {
				if (err) {
					resp.send({
						status: "error",
						message: err
					});
				} else {
					resp.send({
						status: "success",
						message: "success",
						data: doc
					});
				}
			});
		} else {
			resp.send({
				status: "error",
				message: "no id"
			});

		};
	});
}
BaseHandler.prototype.deleteById = function(req, resp) {
	var thisModel = this.model;
	userHandler.verifyToken(req, resp, function(req, resp, next) {

		var id = req.params.id;
		if (id) {
			thisModel.remove({
				"_id": id
			}, function(err) {
				if (err) {
					console.log(err);
					resp.send({
						status: "error",
						message: err
					});
				} else {
					resp.send({
						status: "success",
						message: "removed the entity with id : " + id
					});
				}

			})
		}
	});
}

module.exports = BaseHandler;