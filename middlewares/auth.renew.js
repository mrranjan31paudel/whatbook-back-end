const JWT = require('jsonwebtoken');
const {jwtRefreshSecret, jwtAccessSecret} = require('./../configs/config.structure');
const DB_CONNECTION = require('./../configs/db-initiations/config.db.connect');
const ROUTER = require('express').Router();

ROUTER.route('/')
.post(function(req, res, next){
    let refreshToken = req.body.refreshToken;
    
    DB_CONNECTION.query(`SELECT userid FROM usersrefreshtokens WHERE(refreshtoken='${refreshToken}')`, function(err, result){
      const [resultData] = result;
      if(resultData){
        JWT.verify(refreshToken, jwtRefreshSecret, function(jwtErr, jwtResult){
          if (jwtErr) { //not verified or expired
            console.log(jwtErr);
            if(jwtErr.name==='TokenExpiredError'){
              DB_CONNECTION.query(`DELETE FROM usersrefreshtokens WHERE refreshtoken='${refreshToken}'`, function(err, result){
                if(err) throw err;
                next({
                  msg: jwtErr.name,
                  status: 400
                });		
              });
            }
            else{
                next({
                msg: jwtErr.name,
                status: 400
              });
            }
          }
          else{
            console.log('result: ', jwtResult);
            let newAccessToken = JWT.sign({id: jwtResult.id, email: jwtResult.email}, jwtAccessSecret, {expiresIn: 15});
            let newRefreshToken = JWT.sign({id: jwtResult.id, email: jwtResult.email}, jwtRefreshSecret, {expiresIn: 60});

            DB_CONNECTION.query(`UPDATE usersrefreshtokens SET refreshtoken='${newRefreshToken}' WHERE refreshtoken='${refreshToken}'`, function(dbErr, dbResult){
                if(dbErr) next({
                    msg: dbErr.sqlMessage,
                    status: 500
                });

                res.send({
                    accessToken: newAccessToken, 
                    refreshToken: newRefreshToken
                })
            });
          }
        });
    }
    else{
      next({
          msg: 'Bad Request',//should be unauthorized access
          status: 400
      });
    }
      
  });
    
})

// const renewAccessToken = function(req, res, next){
//     let refreshToken = req.body.refreshToken;
//     JWT.verify(refreshToken, jwtRefreshSecret, function(err, result){
//         if (err) {
//             console.log(err);
//             next({
//               msg: err.name,
//               status: 400
//             });
//           }
//           console.log('result: ', result);

//           res.user = result;
//           next();
//     });

// }

module.exports = ROUTER;