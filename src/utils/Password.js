const bcrypt = require('bcrypt');

class Password {
  static async hash(_data) {
    const saltRounds = 10;
    return bcrypt.hash(_data, saltRounds).then(hash => hash);
  }
}

module.exports = Password;
