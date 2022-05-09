const { sequelize } = require("./DBConn");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
  {
    userid: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      field: "userid",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    subscription: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "subscription",
    },
    username: {
      type: DataTypes.STRING,
      field: "username",
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   field: "created_at",
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   field: "updated_at",
    // },
  },

  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

console.log(`log user.js = `, User === sequelize.models.User);

module.exports = User;
