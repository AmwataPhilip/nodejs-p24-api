const express = require("express");
const router = express.Router();
const customer = require("../models/customerAuthenticationModel");

router.post("/", async (request, response, next) => {
	const Customer = new customer({
		email: request.body.email,
		password: request.body.password
	});
	try {
		const customerLogin = await Customer.validate();
		response.json({
			data: customerLogin,
			respone: "Customer Login Successsful"
		});
	} catch (error) {
		response.json({
			message: error,
			result: "Customer Login Unsuccesful!"
		});
	}
});

module.exports = router;

// TODO: Get the customer email and password
// TODO: Do a find matching record in the database
// TODO: Return JWT Token
// TODO: Hash the passswords
