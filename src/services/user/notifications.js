const query = require('./../../queries/user/notifications');
const countUnreadNotifications = require('./../../utils/unreadNotificationsCounter');
const formatDateTime = require('./../../utils/dateFormatter');

function getNotificationsList(type, userId, callController) {
  query.getNotificationsList(userId, function(queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }

    if (type === 'list') {
      formatDateTime(queryResponse);

      callController(queryResponse);
    } else if (type === 'number') {
      let unreadCount = countUnreadNotifications(queryResponse);
      callController({
        numberOfUnreadNotifications: unreadCount
      });
    }
  });
}

function markNotificationAsRead(userId, selectedNotification, callController) {
  if (selectedNotification.notificationId === 'all') {
    query.markAllNotificationAsRead(userId, function(queryResponse) {
      if (queryResponse.err) {
        return callController({
          err: {
            status: 400
          }
        });
      }
      callController(queryResponse);
    });
  } else if (
    selectedNotification.notificationId &&
    (selectedNotification.toMakeStatus === 1 ||
      selectedNotification.toMakeStatus === 0)
  ) {
    query.markNotificationReadUnread(userId, selectedNotification, function(
      queryResponse
    ) {
      if (queryResponse.err) {
        return callController({
          err: {
            status: 400
          }
        });
      }
      callController(queryResponse);
    });
  } else {
    query.markNotificationAsRead(
      userId,
      selectedNotification.notificationId,
      function(queryResponse) {
        if (queryResponse.err) {
          return callController({
            err: {
              status: 400
            }
          });
        }
        callController(queryResponse);
      }
    );
  }
}

function deleteNotification(userId, notificationId, callController) {
  query.deleteNotification(userId, notificationId, function(queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }
    callController(queryResponse);
  });
}

module.exports = {
  getNotificationsList,
  markNotificationAsRead,
  deleteNotification
};
