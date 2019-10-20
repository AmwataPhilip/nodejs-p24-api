const express = require("express");
const router = express.Router();
const property = require("../models/propertiesModel");

router.get("/", (request, response, next) => {
	response.status(200).json({
		message: "Handling GET requests to /properties"
	});
});

router.post("/", async (request, response, next) => {
	const Property = new property({
		id: parseInt(request.body.id),
		name: request.body.firstname,
		location: request.body.lastname,
		imageURL: request.body.email,
		price: request.body.password
	});
	try {
		const propertySaved = await Property.save();
		response.json({
			data: propertySaved,
			respone: "Property Added"
		});
	} catch (error) {
		response.json({
			message: error,
			result: "Property not added!"
		});
	}
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
