const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./user.routes');
app.use(userRoutes);

const categoryRoutes = require("./category.routes");
app.use(categoryRoutes);

const videoRoutes = require("./video.routes");
app.use(videoRoutes);

const articleRoutes = require('./article.routes');
app.use(articleRoutes);

const paymentRoutes = require('./payment.routes');
app.use(paymentRoutes);

module.exports = app;