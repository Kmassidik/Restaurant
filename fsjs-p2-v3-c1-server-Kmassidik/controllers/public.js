const { User, Category, Cuisine, Favorite } = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");

const { Bcrypt } = require("../helper/bcrypt");
const { Jsonwebtoken } = require("../helper/jwt");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
require("dotenv").config();

class Public {
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let data = {
        username,
        email,
        password,
        role: "customer",
        phoneNumber,
        address,
      };

      let responses = await User.create(data);
      res
        .status(201)
        .json({ message: `${data.email} success add!`, data: responses });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email) {
        throw { name: "login", err: "Email is required!" };
      }
      if (!password) {
        throw { name: "login", err: "Password is required!" };
      }

      let getUser = await User.findOne({ where: { email: email } });
      if (!getUser) {
        throw { name: "login", err: "Invalid Email!" };
      }

      if (getUser.role != "customer") {
        throw {
          name: "unAuthorization",
          message: "Your not registed as customer!",
        };
      }

      let verify = Bcrypt.checkPassword(password, getUser.password);

      if (!verify) {
        throw { name: "login", err: "Invalid Password!" };
      }

      let jwt = Jsonwebtoken.getJWT({
        id: getUser.id,
        role: getUser.role,
      });

      res.status(200).json({
        token: jwt,
        message: "success login!",
        name: getUser.username,
      });
    } catch (error) {
      next(error);
    }
  }
  static async fetchDataCuisine(req, res, next) {
    try {
      const { filter, page } = req.query; // tambahin docs
      console.log(req.query);
      let condition = {
        include: {
          model: Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          status: "active",
        },
        order: [["id", "ASC"]],
        limit: 9,
      };

      // filtering name
      if (filter !== "" && filter !== undefined) {
        condition.where.name = {
          [Op.iLike]: `%${filter}%`,
        };
      }

      // pagination
      if (page !== "" && page !== undefined) {
        condition.offset = +page * condition.limit - condition.limit;
      }

      let responses = await Cuisine.findAll(condition);
      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async fetchById(req, res, next) {
    try {
      let { id } = req.params;
      let { url } = req.query;
      let responses = await Cuisine.findByPk(id, { include: Category });
      if (!responses) {
        throw { name: "NotFound", message: "Data not found" };
      }

      let qrQode = await axios({
        method: "POST",
        url: "https://api.qr-code-generator.com/v1/create",
        params: {
          "access-token": process.env.QR_CODE,
        },
        data: {
          frame_name: "no-frame",
          qr_code_text: url,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      });
      let qiris = qrQode.data;
      res.status(200).json({ responses, qiris });
    } catch (error) {
      next(error);
    }
  }
  static async fetchDataFavorite(req, res, next) {
    try {
      let { id } = req.user;
      let responses = await Favorite.findAll({
        include: {
          model: Cuisine,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        where: {
          UserId: id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!responses) {
        throw { name: "NotFound", message: "Data not found" };
      }
      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async addDataFavorite(req, res, next) {
    try {
      let { id } = req.user;
      let { id: cuisineId } = req.body;

      let checkCuisine = await Cuisine.findByPk(cuisineId);

      if (!checkCuisine) {
        throw { name: "NotFound", message: "Data Cuisine is Invalid!" };
      }

      let responses = await Favorite.create({
        UserId: id,
        CuisineId: cuisineId,
      });

      res.status(201).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      let { google_token } = await req.headers;
      // console.log(google_token,"ini headernya");
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
        // audience: "728100902051-q8n8sa5e3ubnrlpvkkgqj84k9090eb8g.apps.googleusercontent.com",
      });
      const payload = await ticket.getPayload();
      // console.log(payload);
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "kepoooooo",
          role: "customer",
        },
        hooks: false,
      });
      const access_token = await Jsonwebtoken.getJWT({
        id: user.id,
        role: user.role,
      });
      let status = 200;
      let msg = "Login Success!";
      if (isCreated) {
        status = 201;
        msg = "Your data has been registered!";
      }
      res
        .status(status)
        .json({ token: access_token, message: msg, name: payload.name });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { Public };
