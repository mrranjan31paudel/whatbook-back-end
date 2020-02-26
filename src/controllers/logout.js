const logoutServices = require('../services/logout');

function logoutUser(req, res, next) {
  if (req.body.refreshToken) {

    logoutServices.logoutUser(req.body.refreshToken, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult.data);
    });
  }
}

module.exports = { logoutUser };