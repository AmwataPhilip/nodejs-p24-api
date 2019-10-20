const express = require("express");
const app = express();

const propertyRoutes = require("./api/routes/properties");
const customerRoutes = require("./api/routes/customer");
const agentRoutes = require("./api/routes/agents");

app.use("/properties", propertyRoutes);
app.use("/customers", customerRoutes);
app.use("/agents", agentRoutes);

module.exports = app;
