const express = require("express");
const router = express.Router();

router.post("/", (request, response, next) => {
	response.status(201).json({
		message: "Handling POST requests to /customers"
	});
});
