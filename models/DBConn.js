// Import sequelize
const Sequelize = require("sequelize");

// DB Connection Configuration
// const sequelize = new Sequelize(
//   "dbcps5l6ufq0bf",
//   "cohjqehtiqzjtt",
//   "b34383c894e401052b751949c3dfff47fb5ed71a55f3c9161cbbe85d9fb33e88",
//   {
//     host: "ec2-44-196-223-128.compute-1.amazonaws.com",
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//     define: {
//       timestamps: false,
//       freezeTableName: true,
//     },
//   }
// );

const sequelize = new Sequelize('m3_project', 'postgres', 'password', {
  dialect: 'postgres',
  define: {
      timestamps: false,
      freezeTableName: true
  }
});

// Test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connection Successful');
  })
  .catch((err) => {
    console.log('DB Connection Failed', err);

  });

module.exports = {
  sequelize, 
};
