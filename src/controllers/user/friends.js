const userService = require('./../../services/user/friends');

function readUserFriendData(req, res, next) {
  userService.getFriendList(parseInt(req.query.userId), function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function writeUserFriendData(req, res, next) {
  userService.saveFriendRequest(res.user.id, req.body.recieverId, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function updateUserFriendData(req, res, next) {
  userService.acceptFriendRequest(res.user.id, req.body.senderId, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function deleteUserFriendData(req, res, next) {
  userService.deleteFriendship(res.user.id, parseInt(req.query.friendId), function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function readUserRequestData(req, res, next) {
  if (req.query.type === 'list') {
    userService.getRequestList(res.user.id, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  }
  else if (req.query.type === 'number') {
    userService.getNumberOfNewRequests(res.user.id, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  }
}

function readUserPeopleData(req, res, next) {
  userService.getPeopleList(parseInt(req.query.userId), function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }

    res.send(serviceResult);
  });
}

module.exports = { readUserFriendData, writeUserFriendData, updateUserFriendData, deleteUserFriendData, readUserRequestData, readUserPeopleData };