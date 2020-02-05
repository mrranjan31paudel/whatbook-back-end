const ROUTER = require('express').Router();
const logoutUser = require('./../services/auth.logout');

ROUTER.route('/')
  .post(function (req, res, next) {
    if (req.body.refreshToken) {

      const refreshToken = req.body.refreshToken;
      logoutUser(refreshToken, function (serviceResult) {
        if (serviceResult.err) {
          return next(serviceResult.err);
        }
        res.send(serviceResult.data);
      });
    }
  })

module.exports = ROUTER;