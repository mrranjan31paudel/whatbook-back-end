const userService = require('./../services/user');

//-----USER CONTROLLERS: 
function readUserData(req, res, next) {
  if (req.query.id) {
    userService.getUserProfileDetails(res.user, parseInt(req.query.id), function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  }
  else {
    userService.getUserDetails(res.user, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  }
}

function updateUserData(req, res, next) {
  userService.changeUserData(res.user.id, req.body, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  })
}

//-----POST CONTROLLERS
function readUserPostData(req, res, next) {

  if (req.query.userId) {
    userService.getUserPosts(res.user, parseInt(req.query.userId), function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  }
  else if (req.query.ownerId && req.query.postId) {
    userService.getSpecificPost(res.user, parseInt(req.query.ownerId), parseInt(req.query.postId), function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  }
  else {
    userService.getNewsFeed(res.user, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  }
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

//------COMMENT CONTROLLERS:
function readUserCommentData(req, res, next) {
  userService.getComments(res.user, req.query.postId, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function writeUserCommentData(req, res, next) {
  const inputData = req.body;
  userService.postComment(res.user, inputData, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function updateUserCommentData(req, res, next) {
  userService.editComment(res.user, req.body, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  })
}

function deleteUserCommentData(req, res, next) {
  userService.deleteComment(res.user, req.query, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  })
}

//------FRIENDS AND PEOPLE CONTROLLERS: 
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

////*8**************TO BE SHIFTED TO '/friends' ******/
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
    console.log('SERVICE RESULT: ', serviceResult);
    res.send(serviceResult);
  });
}
////*8**************TO BE SHIFTED TO '/friends' ******/

//-----NOTIFICATIONS CONTROLLERS:
function readUserNotificationData(req, res, next) {
  userService.getNotificationsList(req.query.type, res.user.id, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function updateUserNotificationData(req, res, next) {
  userService.markNotificationAsRead(res.user.id, req.body, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function deleteUserNotificationData(req, res, next) {
  userService.deleteNotification(res.user.id, req.query.notificationId, function (serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  })
}

module.exports = { readUserData, updateUserData, readUserPostData, writeUserPostData, updateUserPostData, deleteUserPostData, readUserPostData, writeUserPostData, updateUserPostData, deleteUserPostData, readUserCommentData, writeUserCommentData, updateUserCommentData, deleteUserCommentData, readUserFriendData, writeUserFriendData, updateUserFriendData, deleteUserFriendData, readUserRequestData, readUserPeopleData, readUserNotificationData, updateUserNotificationData, deleteUserNotificationData };