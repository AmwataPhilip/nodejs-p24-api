const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const agent = require("../models/agentsModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (request, response, next) => {
	agent
		.find({ email: request.body.email })
		.exec()
		.then(Agent => {
			if (Agent.length > 1) {
				return response.status(409).json({
					message: "That Email ALready Exists"
				});
			} else {
				const token = jwt.sign(
					{
						email: request.body.email,
						agentId: request.body._id
					},
					process.env.JWT_KEY,
					{
						expiresIn: "1h"
					}
				);
				bcrypt.hash(request.body.password, 10, (error, hash) => {
					if (error) {
						return response.status(500).json({
							message: error.message
						});
					} else {
						const Agent = new agent({
							_id: mongoose.Types.ObjectId(),
							firstname: request.body.firstname,
							lastname: request.body.lastname,
							email: request.body.email,
							password: hash
						});
						Agent.save()
							.then(result => {
								response.status(200).json({
									agent: result,
									token: token,
									message: "Agent Account Created Successfully"
								});
							})
							.catch(error => {
								response.status(500).json({
									message: error.message,
									result: "Agent Account Not Created"
								});
							});
					}
				});
			}
		});
});

module.exports = router;
