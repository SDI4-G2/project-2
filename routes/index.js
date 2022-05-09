const express = require("express");
const app = express();

app.use(express.json());

const articleRoutes = require("./article.routes");
const categoryRoutes = require("./category.routes");
const userRoutes = require("./user.routes");
const videoRoutes = require("./video.routes");

app.use(articleRoutes, categoryRoutes, userRoutes, videoRoutes);

module.exports = app;
>>>>>>> ffbc95dcda9602d14d060546c8449b0c9eb05c2b
