const { User } = require("../models");
const { Bcrypt } = require("../helper/bcrypt");
const { Jsonwebtoken } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
require("dotenv").config();

class Auth {
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let data = {
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      };

      let responses = await User.create(data);
      res.status(201).json({ message: `${data.email} success add!`,data:responses});
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

      let verify = await Bcrypt.checkPassword(password, getUser.password);

      if (!verify) {
        throw { name: "login", err: "Invalid Password!" };
      }

      let jwt = await Jsonwebtoken.getJWT({
        id: getUser.id,
        role: getUser.role,
      });
      res.status(200).json({ token: jwt, message: "success login!", name:getUser.username});
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      let { google_token } = await req.headers;
      // console.log(google_token,"ini headernya");
      // console.log(req.headers);
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
          role: "staff",
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
      res.status(status).json({ token: access_token, message: msg, name:payload.name });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  Auth,
};
