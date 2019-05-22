const jwt = require('jsonwebtoken');

class Token {
  static generateToken(_data, _secret, _expM) {
    return jwt.sign({
      data: _data,
    }, _secret, { expiresIn: _expM * 60 });
  }

  static verifyToken(_token, _secret) {
    return jwt.verify(_token, _secret, (err, decoded) => {
      if (!err) {
        return decoded;
      }
      const error = new Error(err);
      error.code = 401;
      throw error;
    });
  }
}

module.exports = Token;
