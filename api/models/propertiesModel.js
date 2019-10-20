const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
	Id: {
		type: Number,
		required: true
	},
	Name: {
		type: String,
		required: true
	},
	Location: {
		type: String,
		required: true
	},
	ImageURL: {
		type: String,
		required: true
	},
	Price: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Properties", propertySchema);
