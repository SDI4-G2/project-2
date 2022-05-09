const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Express Server up and running'))
app.use(express.json());


module.exports = app;