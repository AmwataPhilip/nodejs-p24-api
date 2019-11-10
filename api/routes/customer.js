const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const customer = require("../models/customersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (request, response, next) => {
	customer
		.find({ email: request.body.email })
		.exec()
		.then(Customer => {
			if (Customer.length > 1) {
				return response.status(409).json({
					message: "That Email Already Exists"
				});
			} else {
				const token = jwt.sign(
					{
						email: request.body.email,
						customerId: request.body._id
					},
					process.env.JWT_KEY,
					{
						expiresIn: "1h"
					}
				);
				bcrypt.hash(request.body.password, 10, (error, hash) => {
					if (error) {
						return response.status(500).json({
							message: error.message
						});
					} else {
						const Customer = new customer({
							_id: mongoose.Types.ObjectId(),
							firstname: request.body.firstname,
							lastname: request.body.lastname,
							email: request.body.email,
							password: hash
						});
						Customer.save()
							.then(result => {
								response.status(200).json({
									customer: result,
									token: token,
									message: "Customer Account Created Successfully"
								});
							})
							.catch(error => {
								response.status(500).json({
									message: error.message,
									result: "Customer Account Not Created"
								});
							});
					}
				});
			}
		});
});

module.exports = router;
