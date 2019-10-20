const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// DB Access Control
require("dotenv/config");

// Import the Routes
const propertyRoutes = require("./api/routes/properties");
const customerRoutes = require("./api/routes/customer");
const customerRoutesAuth = require("./api/routes/customerAuthentication");
const agentRoutes = require("./api/routes/agents");
const agentRoutesAuth = require("./api/routes/agentsAuthentication");

// Ensure Json files are parsed for each request
app.use(bodyParser.json());
// Set up the routes
app.use("/properties", propertyRoutes);
app.use("/customers", customerRoutes);
app.use("/agents", agentRoutes);
app.use("/agents/authentication", agentRoutesAuth);
app.use("/customers/authentication", customerRoutesAuth);

// Connect to Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
	console.log("Connected to Database!");
});

module.exports = app;
