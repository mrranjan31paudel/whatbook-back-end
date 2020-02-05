const JWT = require('jsonwebtoken');
const { jwtAccessSecret } = require('../configs/config.structure');

function authenticateUser(accessToken, callBackMiddleware) {
  JWT.verify(accessToken, jwtAccessSecret, function (err, result) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return callBackMiddleware({
          err: {
            status: 403
          }
        });
      }
    }
    callBackMiddleware(result);
  })
}

module.exports = authenticateUser;