const mongoose = require("mongoose");

const customerAuthenticationSchema = mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("CustomersAuthentication", customerAuthenticationSchema);
