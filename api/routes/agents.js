const express = require("express");
const router = express.Router();
const agent = require("../models/agentsModel");

router.post("/", async (request, response, next) => {
	const Agent = new agent({
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		email: request.body.email,
		password: request.body.password
	});
	try {
		const agentSaved = await Agent.save();
		response.json({
			data: agentSaved,
			respone: "Agent Added"
		});
	} catch (error) {
		response.json({
			message: error,
			result: "Agent not added!"
		});
	}
});

module.exports = router;