// Import sequelize
const Sequelize = require('sequelize');

/// DB Connection Configuration
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
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
