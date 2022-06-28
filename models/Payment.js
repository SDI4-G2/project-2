const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('./DBConn');
const User = require('./User');

class Payment extends Model {}
Payment.init (
    {
        paymentid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stripeid: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Payment',
        tableName: 'payment'
    }

);

Payment.belongsTo(User, {
    foreignKey: 'userid'
});

module.exports = Payment;