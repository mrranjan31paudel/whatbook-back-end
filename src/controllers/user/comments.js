const userService = require('./../../services/user/comments');

function readUserCommentData(req, res, next) {
  userService.getComments(res.user, req.query.postId, function(serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function writeUserCommentData(req, res, next) {
  const inputData = req.body;
  userService.postComment(res.user, inputData, function(serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function updateUserCommentData(req, res, next) {
  userService.editComment(res.user, req.body, function(serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function deleteUserCommentData(req, res, next) {
  userService.deleteComment(res.user, req.query, function(serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

module.exports = {
  readUserCommentData,
  writeUserCommentData,
  updateUserCommentData,
  deleteUserCommentData
};
