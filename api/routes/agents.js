const express = require("express");
const router = express.Router();
const agent = require("../models/agentsModel");

router.post("/", (request, response, next) => {
	response.status(201).json({
		message: "Handling POST requests to /agents"
	});
});

module.exports = router;
