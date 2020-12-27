const userService = require('./../../services/user/notifications');

function readUserNotificationData(req, res, next) {
  userService.getNotificationsList(req.query.type, res.user.id, function(
    serviceResult
  ) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function updateUserNotificationData(req, res, next) {
  userService.markNotificationAsRead(res.user.id, req.body, function(
    serviceResult
  ) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult);
  });
}

function deleteUserNotificationData(req, res, next) {
  userService.deleteNotification(
    res.user.id,
    req.query.notificationId,
    function(serviceResult) {
      if (serviceResult.err) {
        return next(serviceResult.err);
      }
      res.send(serviceResult);
    }
  );
}

module.exports = {
  readUserNotificationData,
  updateUserNotificationData,
  deleteUserNotificationData
};
