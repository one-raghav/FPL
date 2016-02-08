var mongoose = require('mongoose');
var dbConfig = require('../dbConfig.json');
var _ = require("underscore");
var models = require('../models/models.js');
var jwt = require('jsonwebtoken');

var UsersHandler = function(model) {
	this.model = model;
}

UsersHandler.prototype.getUsers = function(req, resp) {
	this.model.find({}, {
		'name': 1,
		'admin':1,
		'_id':0
	}, function(err, users) {
		resp.send({
			status: err ? "error" : "success",
			message: err,
			data: users
		});
	});
};

UsersHandler.prototype.authenticate = function(req, resp) {

	this.model.findOne({
		"name": req.body.user
	}, function(err, user) {
		if (err) {
			resp.send({
				status: "error",
				message: err
			});
		} else if (!user) {

			resp.send({
				status: "error",
				message: "authentication failed, user not found"
			});

		} else if (user.password !== req.body.password) {
			resp.send({
				status: "error",
				message: "authentication failed, wrong password"
			});
		} else {
			
			var token = jwt.sign(user, dbConfig['userAuthSecret'], {
				expiresInMinutes: 1440 // expires in 24 hours
			});
			resp.send({
				status: "success",
				message: 'token',
				data: token
			});
		}
	})
}


UsersHandler.prototype.verifyToken = function(req, resp, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {


		jwt.verify(token, dbConfig['userAuthSecret'], function(err, decoded) {
			if (err) {
				resp.send({
					status: "error",
					message: 'Failed to authenticate token.'
				});
			} else {

				req.decoded = decoded;
				if (next) {
					next(req,resp);
				} else {
					return true;
				}
			}
		});

	} else {
		resp.status(403).send({
			status: "error",
			message: 'No token provided.'
		});
	}
	return false;
}

UsersHandler.prototype.createUser = function(user) {
	this.model.findOneAndUpdate({
		"name": user.name
	}, user, {
		upsert: true
	}, function(err, doc) {
		if (err) {
			console.log("unable to create admin user", err)
		} else {
			console.log("created admin user ", doc);
		}
	})
}

module.exports = new UsersHandler(models["user"]);