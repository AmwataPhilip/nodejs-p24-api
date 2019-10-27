const express = require("express");
const router = express.Router();
const agent = require("../models/agentAuthenticationModel");

router.post("/", async (request, response, next) => {
	const Agent = new agent({
		email: request.body.email,
		password: request.body.password
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
