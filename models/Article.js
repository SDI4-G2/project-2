const { sequelize } = require('../models/DBConn');
const { Model, DataTypes } = require('sequelize');
const Category = require('./Category');

class Article extends Model {}

Article.init(
  {
    articleid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryid: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'categoryid',
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'url',
    },
    free_to_view: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'free_to_view',
    },
  },
  {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
    timestamps: false,
  }
);

Article.belongsTo(Category, {
  foreignKey: 'categoryid',
});

module.exports = Article;
