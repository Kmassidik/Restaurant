const jwt = require('jsonwebtoken');
require('dotenv').config()

class Jsonwebtoken {
    static getJWT(params){
       return jwt.sign(params, process.env.SECRET_KEY);
    }

    static checkJWT(params){
        return jwt.verify(params, process.env.SECRET_KEY);
    }
}

module.exports = {
    Jsonwebtoken
}