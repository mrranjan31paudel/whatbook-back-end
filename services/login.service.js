const JWT = require('jsonwebtoken');
const {jwtRefreshSecret, jwtAccessSecret} = require('./../configs/config.structure');
const { decryptPassword } = require('./password.service');
const query = require('./../queries/login.queries');

function loginService(inputUserData, callController){
  query.checkUserExistance(inputUserData, function(queryResponse){
    if(queryResponse.err){
      callController({err: queryResponse.err});
    }

    const user = queryResponse;
    decryptPassword(inputUserData.password, user.password, function(doesMatch){
      if(doesMatch){
        let jwtPayload = {
          id: user.id,
          email: user.email
        }

        let refreshToken = JWT.sign(jwtPayload, jwtRefreshSecret, {expiresIn: 60});
        let accessToken = JWT.sign(jwtPayload, jwtAccessSecret, {expiresIn: 15});
        
        query.storeRefreshToken(user.id, refreshToken, function(queryResponse){
          if(queryResponse.err){
            callController({err: queryResponse.err});
          }
          callController({data: {
            accessToken: accessToken,
            refreshToken: refreshToken
          }});
        })
      }
      else{
        callController({err: {
          status: 401
        }})
      }
    })
  });

}

module.exports = loginService;