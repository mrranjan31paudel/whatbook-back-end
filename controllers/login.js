const loginService = require('./../services/login');
const ROUTER = require('express').Router();

ROUTER.route('/')
  .post(function (req, res, next) {     // To log in
    const inputData = req.body;
    loginService(inputData, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult.data);
    });
  });

module.exports = ROUTER;