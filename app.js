const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

// Import the Routes
const propertyRoutes = require("./api/routes/properties");
const customerRoutes = require("./api/routes/customer");
const agentRoutes = require("./api/routes/agents");

// Set up the routes
app.use("/properties", propertyRoutes);
app.use("/customers", customerRoutes);
app.use("/agents", agentRoutes);

app.get("/", (request, response, next) => {
	response.send("We're home!");
});

// Connect to Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
	console.log("Connected to Database!");
});

module.exports = app;
