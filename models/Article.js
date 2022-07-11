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
      allowNull: false,
      field: 'categoryid',
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'url',
    },
    free_to_view: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'free_to_view',
    },
    thumbnails: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
