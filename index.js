const { sequelize } = require("./models/User");
const app = require("./routes/index"); // By default, it will look for index.js inside the folder

// const PORT = process.env.PORT || 3000;
// const HOST = "127.0.0.1"; //localhost

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT} `);
});
