const bcrypt = require("bcrypt");

class Bcrypt {
  static hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  static checkPassword(password,password2) {
    return bcrypt.compareSync(password,password2);
  }
}

module.exports = {
  Bcrypt,
};
