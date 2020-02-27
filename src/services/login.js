const jwt = require('jsonwebtoken');
const jwtConfig = require('./../configs/config.structure');
const { decryptPassword } = require('./../utils/password');
const query = require('./../queries/login');

function loginService(inputUserData, callController) {
  query.checkUserExistance(inputUserData, function (queryResponse) {
    if (queryResponse.err) {
      console.log('user not found: ', queryResponse.err);
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
          console.log('secrets: ', jwtConfig.SECRET_KEY_ACCESS_TOKEN, jwtConfig.SECRET_KEY_REFRESH_TOKEN, jwtConfig.LIFE_ACCESS_TOKEN, jwtConfig.LIFE_REFRESH_TOKEN);
          let refreshToken = jwt.sign(jwtPayload, jwtConfig.SECRET_KEY_REFRESH_TOKEN, { expiresIn: jwtConfig.LIFE_REFRESH_TOKEN });
          let accessToken = jwt.sign(jwtPayload, jwtConfig.SECRET_KEY_ACCESS_TOKEN, { expiresIn: jwtConfig.LIFE_ACCESS_TOKEN });

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
              status: 401,
              msg: 'INVALID_PASSWORD'
            }
          })
        }
      });
    }
  });
}

module.exports = loginService;