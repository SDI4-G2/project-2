// Import sequelize
const Sequelize = require('sequelize');

/// DB Connection Configuration
const sequelize = new Sequelize('m3_project', 'postgres', 'password', {
  dialect: 'postgres',
  define: {
    timestamps: false,
    freezeTableName: true,
  },
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
