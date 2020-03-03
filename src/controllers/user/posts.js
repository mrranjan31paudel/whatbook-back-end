const userService = require('./../../services/user/posts');

function readUserPostData(req, res, next) {

  userService.getUserPosts(res.user, req.query, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function writeUserPostData(req, res, next) {
  userService.postUserStatus(res.user, req.body.postData, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  })
}

function updateUserPostData(req, res, next) {
  userService.editPost(res.user, req.body, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  })
}

function deleteUserPostData(req, res, next) {
  userService.deletePost(res.user, req.query, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  })
}

module.exports = { readUserPostData, writeUserPostData, updateUserPostData, deleteUserPostData };