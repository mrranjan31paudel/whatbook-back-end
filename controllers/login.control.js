const loginService = require('./../services/login.service');
const ROUTER = require('express').Router();

ROUTER.route('/')
  .post(function (req, res, next) {     // To log in
    const inputData = req.body;
    loginService(inputData, function(serviceResult){
      if(serviceResult.err){
        next(serviceResult.err);
      }
      res.send(serviceResult.data);
    });
  });

module.exports = ROUTER;