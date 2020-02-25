const userService = require('./../services/user');
const ROUTER = require('express').Router();

ROUTER.route('/')
  .get(function (req, res, next) {
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
  })
  .put(function (req, res, next) {
    userService.changeUserData(res.user.id, req.body, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  });

ROUTER.route('/post')
  .get(function (req, res, next) {
    console.log('PARAMS: ', req.query);
    if (req.query.userId) {
      userService.getUserPosts(res.user, parseInt(req.query.userId), function (serviceResult) {
        if (serviceResult.err) {
          return next(serviceResult.err);
        }
        res.send(serviceResult);
      });
    }
    else if (req.query.ownerId && req.query.postId) {
      console.log('IN HERE 1');
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
  })
  .post(function (req, res, next) {
    userService.postUserStatus(res.user, req.body.postData, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  })
  .put(function (req, res, next) {
    userService.editPost(res.user, req.body, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  })
  .delete(function (req, res, next) {
    userService.deletePost(res.user, req.query, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
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
  })
  .put(function (req, res, next) {
    userService.editComment(res.user, req.body, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  })
  .delete(function (req, res, next) {
    userService.deleteComment(res.user, req.query, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  });

ROUTER.route('/friend')
  .get(function (req, res, next) {
    userService.getFriendList(parseInt(req.query.userId), function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  })
  .post(function (req, res, next) {
    userService.saveFriendRequest(res.user.id, req.body.recieverId, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  })
  .put(function (req, res, next) {
    userService.acceptFriendRequest(res.user.id, req.body.senderId, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  })
  .delete(function (req, res, next) {
    userService.deleteFriendship(res.user.id, parseInt(req.query.friendId), function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  });

ROUTER.route('/requests')
  .get(function (req, res, next) {
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
  });

ROUTER.route('/people')
  .get(function (req, res, next) {
    userService.getPeopleList(parseInt(req.query.userId), function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      console.log('SERVICE RESULT: ', serviceResult);
      res.send(serviceResult);
    });
  });

ROUTER.route('/notifications')
  .get(function (req, res, next) {
    userService.getNotificationsList(req.query.type, res.user.id, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  })
  .put(function (req, res, next) {
    userService.markNotificationAsRead(res.user.id, req.body, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    });
  })
  .delete(function (req, res, next) {
    userService.deleteNotification(res.user.id, req.query.notificationId, function (serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    })
  });

module.exports = ROUTER;