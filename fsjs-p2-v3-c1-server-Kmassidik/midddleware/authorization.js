const { User, Category, Cuisine } = require("../models");

class Authorization {
  static async user(req, res, next) {
    try {
      let { id, role } = req.user;
      let getId = req.params.id;

      if (role == "staff" && id != getId) {
        throw {
          name: "unAuthorization",
          message: "Forbidden Access!",
        };
      }

      let findData = await User.findByPk(getId);
      req.data = findData;

      next();
    } catch (error) {
      next(error);
    }
  }
  static async cuisine(req, res, next) {
    try {
      let { id, role } = req.user;
      let getId = req.params.id;

      let findData = await Cuisine.findByPk(getId);
      if (!findData) {
        throw { name: "NotFound", message: "Cuisine not found" };
      }

      req.data = findData;

      if (role == "staff" && id != findData.authorId) {
        throw {
          name: "unAuthorization",
          message: "Forbidden Access!",
        };
      }
      next();
    } catch (error) {
      next(error);
    }
  }
  static async onlyAdmin(req, res, next) {
    try {
      let { id, role } = req.user;
      let getId = req.params.id;

      if (role == "staff") {
        throw {
          name: "unAuthorization",
          message: "Forbidden Access!",
        };
      }

      let findData = await Category.findByPk(getId);

      req.data = findData;

      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  Authorization,
};
