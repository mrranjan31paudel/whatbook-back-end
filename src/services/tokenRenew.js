const JWT = require('jsonwebtoken');
const jwtConfig = require('../configs/config.structure');
const query = require('./../queries/tokenRenew');

function renewTokens(refreshToken, callBackMiddleware) {
  query.checkTokenExistance(refreshToken, function (queryResponse) {
    if (queryResponse.err) {
      return callBackMiddleware({ err: queryResponse.err });
    }
    let userid = queryResponse.userid;
    JWT.verify(refreshToken, jwtConfig.SECRET_KEY_REFRESH_TOKEN, function (jwtErr, jwtResult) {
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
        let newAccessToken = JWT.sign({ id: jwtResult.id, email: jwtResult.email }, jwtConfig.SECRET_KEY_ACCESS_TOKEN, { expiresIn: jwtConfig.LIFE_ACCESS_TOKEN });
        let newRefreshToken = JWT.sign({ id: jwtResult.id, email: jwtResult.email }, jwtConfig.SECRET_KEY_REFRESH_TOKEN, { expiresIn: jwtConfig.LIFE_REFRESH_TOKEN });

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

module.exports = { renewTokens };