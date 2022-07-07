// Import sequelize
import Sequelize from "rn-sequelize";
// const Sequelize = require("sequelize");

// DB Connection Configuration
const sequelize = new Sequelize(
  "dbcps5l6ufq0bf",
  "jiudgwrdzkfbkc",
  "f5dcc6bddfcb30fe465996e085f7b3e535e37e15d5d55fbed9112b805a049b6e",
  {
    host: "ec2-44-196-223-128.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

// Test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log("DB Connection Failed", err);
  });

module.exports = {
  sequelize,
};
