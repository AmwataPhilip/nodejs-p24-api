const express = require("express");
const router = express.Router();
const agent = require("../models/agentsModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (request, response, next) => {
	agent
		.find({ email: request.body.email })
		.exec()
		.then(Agent => {
			if (Agent.length < 1) {
				return response.status(401).json({
					message: "Agent Authentication Failed"
				});
			}
			bcrypt.compare(request.body.password, Agent[0].password, (error, result) => {
				if (error) {
					return response.status(401).json({
						message: "Agent Authenticaton Failed"
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							email: Agent[0].email,
							agentId: Agent[0]._id
						},
						process.env.JWT_KEY,
						{
							expiresIn: "1h"
						}
					);
					return response.status(200).json({
						message: "Agent Authentication Successful",
						token: token
					});
				}
			});
		})
		.catch();
});

module.exports = router;

// TODO: Get the agent email and password
// TODO: Do a find matching record in the database
// TODO: Return JWT Token
// TODO: Hash the passswords
