const JWT = require('jsonwebtoken');
const {jwtRefreshSecret, jwtAccessSecret} = require('./../configs/config.structure');
const DB_CONNECTION = require('./../configs/db-initiations/config.db.connect');
const ROUTER = require('express').Router();
const { decryptPassword } = require('./password.control');

ROUTER.route('/')
  .get(function (req, res, next) {
    console.log('Inside LOGIN GET');
    res.send('Your Log In page will appear here');
  })
  .post(function (req, res, next) {     // To log in
    const inputData = req.body;

    console.log('INPUT: email: ' + inputData.email + ' Password: ' + inputData.password);
    DB_CONNECTION.query(`SELECT * FROM users WHERE (email='${inputData.email}')`, function (err, result) {
      console.log('resultData: ', result);
      const [resultData] = result;

      if (err) {
        res.send(err.code);
      }
      else if (resultData) {
        console.log('pass in DB: ', resultData.password);
        decryptPassword(inputData.password, resultData.password, function (doesMatch) {
          if (doesMatch) {
            let jwtPayload = { 
              id: resultData.id, email: resultData.email 
            }
            console.log(jwtAccessSecret, jwtRefreshSecret);
            let refreshToken = JWT.sign(jwtPayload, jwtRefreshSecret, {expiresIn: 60});
            let accessToken = JWT.sign(jwtPayload, jwtAccessSecret, {expiresIn: 15});
            
            DB_CONNECTION.query(`INSERT INTO usersrefreshtokens (userid, refreshtoken) VALUES('${resultData.id}', '${refreshToken}')`, function(err, result){
              if(err) {
                console.log('err: ', err);
                next({
                  msg: 'TOKEN_STORE_FAILED',
                  status: 500
                });
              }
              else{
                res.json({
                  'user': {
                    name: resultData.name,
                    dob: resultData.dob,
                    email: resultData.email
                  },
                  'access-token': accessToken,
                  'refresh-token': refreshToken
                });
              }
            });

          }
          else {
            next({
              msg: 'USER_NOT_MATCH',
              status: 406
            });
          }
        });
      }
      else {
        next({
          msg: 'USER_NOT_FOUND',
          status: 404
        });
      }
    });
  });

module.exports = ROUTER;