// Import sequelize
const Sequelize = require('sequelize');

// DB Connection Configuration

const sequelize = new Sequelize('ddclrueuup70lk', 'ghgfgbeiuwwnnw', '24f33336603d473adc08deec730fe1235f91c84ff147d6def78ec9f1d8f53b3b', {
    host: 'ec2-54-158-247-210.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

// Test DB connection
sequelize.authenticate().then(() => {
    console.log('DB Connection Successful');
}).catch((err) => {
    console.log('DB Connection Failed', err);
})

module.exports = {
    sequelize
};
