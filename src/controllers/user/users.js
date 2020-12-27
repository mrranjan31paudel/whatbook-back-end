const userService = require('./../../services/user/users');

function readUserData(req, res, next) {
  userService.getUserDetails(res.user, req.query, function(serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function updateUserData(req, res, next) {
  userService.changeUserData(res.user.id, req.body, function(serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

module.exports = { readUserData, updateUserData };
