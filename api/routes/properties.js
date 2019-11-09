const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const property = require("../models/propertiesModel");

router.get("/", (request, response, next) => {
	property
		.find()
		.select("name location imageURL price")
		.exec()
		.then(doc => {
			const res = {
				count: doc.length,
				properties: doc
			};
			response.status(200).json(res);
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
		.select("name location imageURL price")
		.exec()
		.then(doc => {
			if (doc) {
				response.status(200).json({
					data: doc,
					result: "Property Found"
				});
			}
		})
		.catch(error => {
			response.status(500).json({
				message: error.message,
				result: `Property with id ${id} was not found`
			});
		});
});

router.post("/", async (request, response, next) => {
	const Property = new property({
		_id: mongoose.Types.ObjectId(),
		name: request.body.name,
		location: request.body.location,
		imageURL: request.body.imageURL,
		price: request.body.price
	});
	try {
		const propertySaved = await Property.save();
		response.json({
			property: {
				_id: propertySaved._id,
				name: propertySaved.name,
				location: propertySaved.location,
				imageURL: propertySaved.imageURL,
				price: propertySaved.price
			},
			result: "Property Added"
		});
	} catch (error) {
		response.json({
			message: error.message,
			result: "Property not Added"
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
		.then(() => {
			property.findById(id).then(doc => {
				response.status(200).json({
					property: {
						_id: doc._id,
						name: doc.name,
						location: doc.location,
						imageURL: doc.imageURL,
						price: doc.price
					},
					message: "Property Updated Successfully"
				});
			});
		})
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
			response.status(200).json({
				response: result,
				message: "Property Deleted Successfully"
			});
		})
		.catch(error => {
			response.status(500).json({
				message: error.message,
				result: "Unable to Delete Property"
			});
		});
});

module.exports = router;
