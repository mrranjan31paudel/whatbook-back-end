const JWT = require('jsonwebtoken');
const { jwtRefreshSecret, jwtAccessSecret } = require('../configs/config.structure');
const { decryptPassword } = require('./password');
const query = require('../queries/login');

function loginService(inputUserData, callController) {
  query.checkUserExistance(inputUserData, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    else {
      const user = queryResponse;
      decryptPassword(inputUserData.password, user.password, function (doesMatch) {
        if (doesMatch.err) {
          return callController({ err: doesMatch.err });
        }
        else if (doesMatch) {
          let jwtPayload = {
            id: user.id,
            email: user.email
          }

          let refreshToken = JWT.sign(jwtPayload, jwtRefreshSecret, { expiresIn: 300 });
          let accessToken = JWT.sign(jwtPayload, jwtAccessSecret, { expiresIn: 60 });

          query.storeRefreshToken(user.id, refreshToken, function (queryResponse) {
            if (queryResponse.err) {
              return callController({ err: queryResponse.err });
            }
            else {
              callController({
                data: {
                  accessToken: accessToken,
                  refreshToken: refreshToken
                }
              });
            }
          })
        }
        else {
          callController({
            err: {
              status: 401
            }
          })
        }
      });
    }
  });
}

module.exports = loginService;