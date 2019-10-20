const mongoose = require("mongoose");

const agentSchema = mongoose.Schema({
	Id: {
		type: Number,
		required: true
	},
	FirstName: {
		type: String,
		required: true
	},
	LastName: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Agents", agentSchema);
