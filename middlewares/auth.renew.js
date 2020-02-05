const renewTokens = require('./../services/auth.renew');
const ROUTER = require('express').Router();

ROUTER.route('/')
  .post(function (req, res, next) {
    let refreshToken = req.body.refreshToken;
    renewTokens(refreshToken, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult.data);
    });
  });

module.exports = ROUTER;