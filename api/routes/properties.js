const express = require("express");
const router = express.Router();

router.get("/", (request, response, next) => {
	response.status(200).json({
		message: "Handling GET requests to /properties"
	});
});

router.get("/:propertyId", (request, response, next) => {
	const id = request.params.productId;
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
