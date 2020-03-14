const dbConnection = require('./../../configs/db-initiations/config.db.connect');

function getNotificationsList(userId, returnQueryResponse) {
  dbConnection.query(
    `SELECT user_notifications.id, user_notifications.issuerid, users.name, user_notifications.action, user_notifications.target, user_notifications.targetid, user_notifications.post_ownerid, user_notifications.date_time, user_notifications.status FROM users INNER JOIN user_notifications ON (user_notifications.userid='${userId}' AND users.id=user_notifications.issuerid) ORDER BY user_notifications.date_time DESC `,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }

      returnQueryResponse(result);
    }
  );
}

function markNotificationAsRead(userId, notificationId, returnQueryResponse) {
  dbConnection.query(
    `UPDATE user_notifications SET status='1' WHERE (id='${notificationId}' AND userid='${userId}')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    }
  );
}

function markAllNotificationAsRead(userId, returnQueryResponse) {
  dbConnection.query(
    `UPDATE user_notifications SET status='1' WHERE (userid='${userId}' AND status='0')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    }
  );
}

function markNotificationReadUnread(
  userId,
  notificationInfo,
  returnQueryResponse
) {
  dbConnection.query(
    `UPDATE user_notifications SET status='${notificationInfo.toMakeStatus}' WHERE (userid='${userId}' AND id='${notificationInfo.notificationId}')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    }
  );
}

function deleteNotification(userId, notificationId, returnQueryResponse) {
  dbConnection.query(
    `DELETE FROM user_notifications WHERE (id='${notificationId}' AND userid='${userId}')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    }
  );
}

module.exports = {
  getNotificationsList,
  markNotificationAsRead,
  markAllNotificationAsRead,
  markNotificationReadUnread,
  deleteNotification
};
