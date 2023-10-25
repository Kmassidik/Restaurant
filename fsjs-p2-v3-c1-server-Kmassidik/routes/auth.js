const express = require('express');
const { Auth } = require('../controllers/auth');
let routes = express.Router()

routes.post('/register',Auth.register)
routes.post('/login',Auth.login)
routes.post('/google-login',Auth.googleLogin)

module.exports = routes