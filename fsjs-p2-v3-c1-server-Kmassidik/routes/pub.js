const express = require('express');
const { Public } = require('../controllers/public');
const { authentication } = require('../midddleware/authentication');
let routes = express.Router()

routes.post('/register',Public.register)
routes.post('/login',Public.login)
routes.post('/google-login',Public.googleLogin)
routes.get('/cuisines',Public.fetchDataCuisine)
routes.get('/cuisines/:id',Public.fetchById)

routes.use(authentication)
routes.get('/favorites',Public.fetchDataFavorite)
routes.post('/favorites',Public.addDataFavorite)

module.exports = routes