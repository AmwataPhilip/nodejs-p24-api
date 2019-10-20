const express = require("express");
const router = express.Router();
const customer = require("../models/customersModel");

router.post("/", async (request, response, next) => {
	const Customer = new customer({
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		email: request.body.email,
		password: request.body.password
	});
	try {
		const customerSaved = await Customer.save();
		response.json({
			data: customerSaved,
			respone: "Customer Added"
		});
	} catch (error) {
		response.json({
			message: error,
			result: "Customer not added!"
		});
	}
});

module.exports = router;
