const userService = require('./../services/user');
const ROUTER = require('express').Router();

ROUTER.route('/')
  .get(function (req, res, next) {
    userService.getUserDetails(res.user, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  })
  .post(function (req, res, next) {
    userService.postUserStatus(res.user, req.body.postData, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  });

ROUTER.route('/feeds')
  .get(function (req, res, next) {
    userService.getNewsFeed(res.user, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  });

ROUTER.route('/comment')
  .get(function (req, res, next) {
    userService.getComments(res.user, req.query.postId, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  })
  .post(function (req, res, next) {
    const inputData = req.body;
    userService.postComment(res.user, inputData, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  });

module.exports = ROUTER;