const express = require("express");
const router = express.Router();
const agent = require("../models/agentAuthenticationModel");
const bcrypt = require("bcrypt");

router.post("/", async (request, response, next) => {
	bcrypt.hash(request.body.password, 10, (error, hash) => {
		if (error) {
			return response.status(500).json({
				message: error.message
			});
		} else {
			const Agent = new agent({
				email: request.body.email,
				password: hash
			});
		}
	});
	try {
		const agentLogin = await Agent.validate();
		response.json({
			data: agentLogin,
			respone: "Agent Login Successful"
		});
	} catch (error) {
		response.json({
			message: error,
			result: "Agent Login Unsuccessful"
		});
	}
});

module.exports = router;

// TODO: Get the agent email and password
// TODO: Do a find matching record in the database
// TODO: Return JWT Token
// TODO: Hash the passswords
