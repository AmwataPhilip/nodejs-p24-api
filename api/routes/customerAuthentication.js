const express = require("express");
const router = express.Router();
const customer = require("../models/customersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (request, response, next) => {
	customer
		.find({ email: request.body.email })
		.exec()
		.then(Customer => {
			if (Customer.length < 1) {
				return response.status(401).json({
					message: "Customer Authentication Failed"
				});
			}
			bcrypt.compare(request.body.password, Customer[0].password, (error, result) => {
				if (error) {
					return response.status(401).json({
						message: "Customer Authenticaton Failed"
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							email: Customer[0].email,
							customerId: Customer[0]._id
						},
						process.env.JWT_KEY,
						{
							expiresIn: "1h"
						}
					);
					return response.status(200).json({
						message: "Customer Authentication Successful",
						token: token
					});
				}
			});
		})
		.catch();
});

module.exports = router;

// TODO: Get the customer email and password
// TODO: Do a find matching record in the database
// TODO: Return JWT Token
// TODO: Hash the passswords
