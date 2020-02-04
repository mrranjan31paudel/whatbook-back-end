const JWT = require('jsonwebtoken');
const { jwtAccessSecret } = require('./../configs/config.structure');


const verifyUser = function (req, res, next) {
  let userToken;

  if (req.headers.authorization) {
    userToken = req.headers.authorization;
  }
  JWT.verify(userToken, jwtAccessSecret, function (err, result) {
    if (err) {
      console.log(err);
      next({
        msg: err.name,
        status: 400
      });
    }
    console.log('result: ', result);
    res.user = result;
    next();
  });
}

module.exports = verifyUser;