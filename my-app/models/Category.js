const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('./DBConn');

class Category extends Model {}
Category.init (
    {
        categoryid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Category',
        tableName: 'category'
    }

);

module.exports = Category;