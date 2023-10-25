"use strict";
const { Model } = require("sequelize");
const { Bcrypt } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cuisine, {
        foreignKey: "authorId",
      });
      User.hasMany(models.Favorite, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username is required!",
          },
          notNull: {
            msg: "Username is required!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email has been registered, please use another email!",
        },
        validate: {
          notEmpty: {
            msg: "Email is required!",
          },
          notNull: {
            msg: "Email is required!",
          },
          isEmail: {
            msg: "Your email input format is wrong, example: example@example.com",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required!",
          },
          notNull: {
            msg: "Password is required!",
          },
          len: {
            args: [5, 15],
            msg: "Password minimum is 5, and max is 15",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["admin", "staff", "customer"]],
            msg: "Must be user or admin",
          },
          notEmpty: {
            msg: "role is required!",
          },
          notNull: {
            msg: "role is required!",
          },
        },
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, opt) => {
    user.password = Bcrypt.hashPassword(user.password);
  });

  return User;
};
