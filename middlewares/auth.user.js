const authenticateUser = require('./../services/auth.user');

const verifyUser = function (req, res, next) {
  let userToken;
  if (req.headers.authorization) {
    userToken = req.headers.authorization;
  }
  authenticateUser(userToken, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.user = serviceResult;
    next();
  })
}

module.exports = verifyUser;