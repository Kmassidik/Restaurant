const { User, Category, Cuisine, History } = require("../models");

class Controller {
  static async users(req, res, next) {
    try {
      let dataUser = await User.findAll({
        attributes: [
          "id",
          "username",
          "email",
          "role",
          "phoneNumber",
          "address",
          "createdAt",
          "updatedAt",
        ],
      });
      res.status(200).json(dataUser);
    } catch (err) {
      next(err);
    }
  }
  static async cuisines(req, res, next) {
    try {
      let dataCuisine = await Cuisine.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "username", "role", "createdAt", "updatedAt"],
          },
          {
            model: Category,
            attributes: ["id", "name", "createdAt", "updatedAt"],
          },
        ],
      });
      res.status(200).json(dataCuisine);
    } catch (err) {
      next(err);
    }
  }
  static async categories(req, res, next) {
    try {
      let dataCategory = await Category.findAll();
      res.status(200).json(dataCategory);
    } catch (err) {
      next(err);
    }
  }
  static async addCuisines(req, res, next) {
    try {
      let { name, description, price, imgUrl, categoryId } = req.body;
      let { id, username } = req.user;

      imgUrl = imgUrl
        ? imgUrl
        : "https://www.freepik.com/free-vector/images-concept-illustration_5204684.htm#query=default%20image&position=1&from_view=search&track=ais";

      let data = {
        name,
        description,
        price,
        imgUrl,
        authorId: id,
        categoryId,
      };

      let getData = await Cuisine.create(data);
      if (getData) {
        History.create({
          name: getData.name,
          description: `new Cuisines: ${getData.name} has been add, with id: ${getData.id} created`,
          updatedBy: username,
        });
      }

      res.status(201).json({ data, message: `success add data ${data.name}!` });
    } catch (err) {
      next(err);
    }
  }
  static async addCategories(req, res, next) {
    try {
      let { name } = req.body;
      let { id, username } = req.user;
      let data = {
        name,
      };

      let getData = await Category.create(data);
      if (getData) {
        History.create({
          name: getData.name,
          description: `new Category: ${getData.name} has been add, with id: ${getData.id} created`,
          updatedBy: username,
        });
      }

      res.status(201).json({ data, message: "success add data!" });
    } catch (err) {
      next(err);
    }
  }
  static async userById(req, res, next) {
    try {
      let { id } = req.params;
      let user = await User.findByPk(id, {
        attributes: [
          "username",
          "email",
          "role",
          "phoneNumber",
          "address",
          "createdAt",
          "updatedAt",
        ],
      });
      if (!user) {
        throw { name: "NotFound", message: "Error data not found!" };
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async cuisineById(req, res, next) {
    try {
      let { id } = req.params;
      let dataCuisine = await Cuisine.findByPk(id, {
        include: [
          { model: User, attributes: ["username"] },
          { model: Category, attributes: ["name"] },
        ],
      });

      if (!dataCuisine) {
        throw { name: "NotFound", message: "Error data not found!" };
      }

      res.status(200).json(dataCuisine);
    } catch (error) {
      next(error);
    }
  }
  static async categoryById(req, res, next) {
    try {
      let { id } = req.params;
      let dataCategory = await Category.findByPk(id);

      if (!dataCategory) {
        throw { name: "NotFound", message: "Error data not found!" };
      }

      res.status(200).json(dataCategory);
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const user = req.data;
      let { id, username } = req.user;
      if (!user) {
        throw { name: "NotFound", message: "Error data not found!" };
      }

      let getData = await user.destroy();
      if (getData) {
        History.create({
          name: getData.name,
          description: `User: ${getData.name} has been delete, with id: ${getData.id} deleted`,
          updatedBy: username,
        });
      }

      res
        .status(200)
        .json({ user, message: `${user.email} success to delete` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteCuisine(req, res, next) {
    try {
      const cuisine = req.data;
      let { id, username } = req.user;
      let getData = await cuisine.destroy();
      if (getData) {
        History.create({
          name: getData.name,
          description: `Cuisine: ${getData.name} has been delete, with id: ${getData.id} deleted`,
          updatedBy: username,
        });
      }

      res
        .status(200)
        .json({ cuisine, message: `${cuisine.name} deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const category = req.data;
      let { id, username } = req.user;
      if (!category) {
        throw { name: "NotFound", message: "Error data not found!" };
      }

      let getData = await category.destroy();
      if (getData) {
        History.create({
          name: getData.name,
          description: `Category: ${getData.name} has been delete, with id: ${getData.id} deleted`,
          updatedBy: username,
        });
      }

      res
        .status(200)
        .json({ category, message: `${category.name} deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
  static async cuisineByCategory(req, res, next) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) {
        throw { name: "NotFound", message: "Error data not found!" };
      }

      const cuisines = await Cuisine.findAll({
        where: { categoryId: category.id },
      });

      if (!cuisines) {
        throw { name: "NotFound", message: "Error data not found!" };
      }

      res.status(200).json({ cuisines, message: "Data Found" });
    } catch (error) {
      next(error);
    }
  }
  static async putCuisines(req, res, next) {
    try {
      let { id } = req.params;
      let { id: idUser, username } = req.user;
      let { name, description, price, imgUrl, categoryId } = req.body;

      let dataCuisine = await Cuisine.findByPk(id);

      if (!dataCuisine) {
        throw { name: "NotFound", message: "Data not found!" };
      }

      let getData = await dataCuisine.update({
        name: name,
        description: description,
        price: price,
        imgUrl: imgUrl,
        categoryId: +categoryId,
        authorId: +idUser,
      });

      if (getData) {
        History.create({
          name: getData.name,
          description: `Cuisine: ${getData.name} has been updated, with id: ${getData.id} updated`,
          updatedBy: username,
        });
      }

      res
        .status(200)
        .json({ data: getData, message: `${name} data has been update!` });
    } catch (error) {
      next(error);
    }
  }
  static async patchCuisines(req, res, next) {
    try {
      let { id } = req.params;
      let { status } = req.body;
      let { id: idUser, username } = req.user;

      if (status != "inactive" && status != "active" && status != "archived") {
        throw { name: "WrongInput", message: "Invalid status value!" };
      }

      let getCuisine = await Cuisine.findByPk(id);

      if (!getCuisine) {
        throw { name: "NotFound", message: "Data not found!" };
      }

      let getData = await getCuisine.update({
        status: status,
      });
      if (getData) {
        History.create({
          name: getData.name,
          description: `Cuisine: ${getData.name} has been updated status to ${status}, with id: ${getData.id} updated`,
          updatedBy: username,
        });
      }

      res
        .status(200)
        .json({ data: getData, message: `status change to ${status}!` });
    } catch (error) {
      next(error);
    }
  }
  static async getHistories(req, res, next) {
    try {
      let data = await History.findAll({
        order: [["id", "DESC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
