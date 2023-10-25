const { Jsonwebtoken } = require("../helper/jwt");
const { User } = require("../models");
require("dotenv").config();

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "authentication" };
    }

    let payload = await Jsonwebtoken.checkJWT(access_token);

    let findData = await User.findByPk(payload.id);

    if (!findData) {
      throw { name: "authentication" };
    }
    
    req.user = {
      id: findData.id,
      role: findData.role,
      username: findData.username
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
};
