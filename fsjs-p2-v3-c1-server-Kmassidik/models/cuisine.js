"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.User, { foreignKey: "authorId" });
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId" });
      Cuisine.hasMany(models.Favorite, { foreignKey: "CuisineId" });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name is required!",
          },
          notNull: {
            msg: "name is required!",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "description is required!",
          },
          notNull: {
            msg: "description is required!",
          },
        },
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "price is required!",
          },
          notNull: {
            msg: "price is required!",
          },
          min: {
            args: 10000,
            msg: "minimal price is 10000",
          },
          isNumeric: {
            msg: "please input only number",
          },
        },
      },
      imgUrl: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "imgUrl is required!",
          },
          notNull: {
            msg: "imgUrl is required!",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "authorId is required!",
          },
          notEmpty: {
            msg: "authorId is required!",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "categoryId is required!",
          },
          notEmpty: {
            msg: "categoryId is required!",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "active",
        validate: {
          isIn: {
            args: [["inactive", "active", "archived"]],
            msg: "Must be inactive active or archived",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
