const express = require("express");
const router = express.Router();
const property = require("../models/propertiesModel");

router.get("/", (request, response, next) => {
	property
		.find()
		.exec()
		.then(doc => {
			response.status(200).json(doc);
		})
		.catch(error => {
			response.status(500).json({
				message: error.message,
				result: "Unable to Get Properties"
			});
		});
});

router.get("/:propertyId", (request, response, next) => {
	const id = request.params.propertyId;
	property
		.findById(id)
		.exec()
		.then(doc => {
			if (doc) {
				response.status(200).json({
					data: doc,
					result: "Property Found"
				});
			} else {
				response.status(404).json({ message: "No Property Found" });
			}
		})
		.catch(error => {
			response.status(500).json({
				message: error.message,
				result: "No Property Found"
			});
		});
});

router.post("/", async (request, response, next) => {
	const Property = new property({
		id: parseInt(request.body.id),
		name: request.body.name,
		location: request.body.location,
		imageURL: request.body.imageURL,
		price: request.body.price
	});
	try {
		const propertySaved = await Property.save();
		response.json({
			data: propertySaved,
			result: "Property Added"
		});
	} catch (error) {
		response.json({
			message: error,
			result: "Property not added!"
		});
	}
});
router.patch("/:propertyId", (request, response, next) => {
	const id = request.params.propertyId;
	property
		.update(
			{ _id: id },
			{
				$set: {
					name: request.body.name,
					location: request.body.location,
					imageURL: request.body.imageURL,
					price: request.body.price
				}
			}
		)
		.exec()
		.then()
		.catch(error => {
			response.status(500).json({
				message: error.message,
				result: "Unable to Update Property"
			});
		});
});

router.delete("/:propertyId", (request, response, next) => {
	const id = request.params.propertyId;
	property
		.remove({ _id: id })
		.exec()
		.then(result => {
			response.status(200).json(result);
		})
		.catch(error => {
			response.status(500).json({
				message: error.message,
				result: "Unable to Delete Property"
			});
		});
});

module.exports = router;
