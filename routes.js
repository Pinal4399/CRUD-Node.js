const express = require('express');
const app=express();

const employeeRoute = require("./router/employeeRoutes");
//define all routes here
app.use("/employee",employeeRoute);
module.exports = app;