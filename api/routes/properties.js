const express = require("express");
const router = express.Router();
const agent = require("../models/propertiesModel");

router.get("/", (request, response, next) => {
	response.status(200).json({
		message: "Handling GET requests to /properties"
	});
});

router.post("/", (request, response, next) => {
	response.status(200).json({
		message: "Handling POST requests to /properties"
	});
});

router.patch("/:propertyId", (request, response, next) => {
	response.status(201).json({
		message: "Handling PATCH requests to /properties"
	});
});

router.delete("/:propertyId", (request, response, next) => {
	response.status(200).json({
		message: "Handling DELETE requests to /properties"
	});
});

module.exports = router;
