const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./DBConn');

class Category extends Model {}
Category.init(
  {
    categoryid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnails: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
  }
);

module.exports = Category;
