const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	imageURL: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Properties", propertySchema);
