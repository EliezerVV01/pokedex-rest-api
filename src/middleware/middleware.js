const jwt = require('jsonwebtoken');
const CONFIG = require('./../../config/config');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (!token) {
    const httpResponse = { status: 401, body: { errorMessage: 'No token suplied' } };
    return res.status(httpResponse.status).json(httpResponse.body);
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  jwt.verify(token, CONFIG.auth_token_secret, (err, decoded) => {
    if (err) {
      const httpResponse = { status: 401, body: { errorMessage: 'Invalid token' } };
      return res.status(httpResponse.status).json(httpResponse.body);
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  checkToken: checkToken
};
