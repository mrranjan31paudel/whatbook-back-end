const JWT = require('jsonwebtoken');
const { SECRET_KEY_ACCESS_TOKEN } = require('../configs/config.structure');

function authenticateUser(accessToken, callBackMiddleware) {
  JWT.verify(accessToken, SECRET_KEY_ACCESS_TOKEN, function (err, result) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return callBackMiddleware({
          err: {
            status: 401,
            msg: 'TOKEN_EXPIRED'
          }
        });
      }
      else {
        return callBackMiddleware({
          err: {
            status: 400
          }
        });
      }
    }
    callBackMiddleware(result);
  })
}

module.exports = authenticateUser;