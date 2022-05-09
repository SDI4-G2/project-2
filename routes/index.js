const express = require("express");
const User = require("../models/User");
const app = express();

app.use(express.json());

// const articleRoutes = require("./article.routes");
// const categoryRoutes = require("./category.routes");
const userRoutes = require("./user.routes");
// const videoRoutes = require("./video.routes");

// app.use(articleRoutes, categoryRoutes, userRoutes, videoRoutes);

app.use(userRoutes);

module.exports = app;
