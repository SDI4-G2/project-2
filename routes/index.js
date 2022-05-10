const express = require("express");
const User = require("../models/User");
const app = express();

app.use(express.json());

const userRoutes = require("./user.routes");
app.use(userRoutes);

const videoRoutes = require('./video.routes');
app.use(videoRoutes);

module.exports = app;

