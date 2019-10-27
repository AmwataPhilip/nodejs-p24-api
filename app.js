const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// DB Access Control
require("dotenv/config");

// Import the Routes
const propertyRoutes = require("./api/routes/properties");
const customerRoutes = require("./api/routes/customer");
const customerRoutesAuth = require("./api/routes/customerAuthentication");
const agentRoutes = require("./api/routes/agents");
const agentRoutesAuth = require("./api/routes/agentsAuthentication");

// Ensure Json files are parsed for each request
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handling CORS Errors
app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "*");

	if (request.method == "OPTIONS") {
		response.header("Access-Control-Allow-Methods", "GET POST PUT PATCH DELETE");
		response.status(200).json({});
	}
	next();
});

// Set up the routes
app.use("/properties", propertyRoutes);
app.use("/customers", customerRoutes);
app.use("/agents", agentRoutes);
app.use("/agents/authentication", agentRoutesAuth);
app.use("/customers/authentication", customerRoutesAuth);

// 404 Error Catch
app.use((request, response, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

// Error Handling

app.use((error, request, response, next) => {
	response.status(error.status || 500);
	response.json({
		message: error.message,
		code: error.status
	});
});

// Connect to Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
	console.log("Connected to Database!");
});

module.exports = app;
