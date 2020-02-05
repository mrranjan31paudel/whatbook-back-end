const registerService = require('./../services/register');
const ROUTER = require('express').Router();

ROUTER.route('/')
  .post(function (req, res, next) {     // To register
    const inputData = req.body;
    registerService(inputData, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult.data);
    });
  });

module.exports = ROUTER;