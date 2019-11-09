const mongoose = require("mongoose");

const agentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Agents", agentSchema);
