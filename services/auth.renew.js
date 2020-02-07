const JWT = require('jsonwebtoken');
const { jwtRefreshSecret, jwtAccessSecret } = require('../configs/config.structure');
const query = require('../queries/auth.renew');

function renewTokens(refreshToken, callBackMiddleware) {
  query.checkTokenExistance(refreshToken, function (queryResponse) {
    if (queryResponse.err) {
      return callBackMiddleware({ err: queryResponse.err });
    }
    let userid = queryResponse.userid;
    JWT.verify(refreshToken, jwtRefreshSecret, function (jwtErr, jwtResult) {
      if (jwtErr) {
        if (jwtErr.name === 'TokenExpiredError') {
          query.deleteExpiredToken(refreshToken, userid, function (queryResponse) {
            if (queryResponse.err) {
              return callBackMiddleware({ err: queryResponse.err });
            }
            return callBackMiddleware({
              err: {
                status: 401
              }
            });
          });
        }
        else {
          return callBackMiddleware({
            err: {
              status: 401
            }
          });
        }
      }
      else {
        let newAccessToken = JWT.sign({ id: jwtResult.id, email: jwtResult.email }, jwtAccessSecret, { expiresIn: 60 });
        let newRefreshToken = JWT.sign({ id: jwtResult.id, email: jwtResult.email }, jwtRefreshSecret, { expiresIn: 300 });

        query.storeNewRefreshToken(newRefreshToken, refreshToken, function (queryResponse) {
          if (queryResponse.err) {
            return callBackMiddleware({ err: queryResponse.err });
          }
          callBackMiddleware({
            data: {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken
            }
          });
        })
      }
    });
  });
}

module.exports = renewTokens;