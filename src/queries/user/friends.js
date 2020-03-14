const dbConnection = require('./../../configs/db-initiations/config.db.connect');
const currentDate = require('./../../utils/currentDate');

function getFriendList(userId, returnQueryResponse) {
  dbConnection.query(
    `SELECT users.id, users.name FROM users INNER JOIN user_friends ON ((users.id=user_friends.senderid OR users.id=user_friends.recieverid) AND NOT (users.id='${userId}')) WHERE ((user_friends.senderid='${userId}' OR user_friends.recieverid='${userId}') AND user_friends.request_status='1')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse(result);
    }
  );
}

function getRequestList(userId, returnQueryResponse) {
  dbConnection.query(
    `SELECT users.id, users.name, user_friends.senderid, user_friends.recieverid FROM users INNER JOIN user_friends ON ((users.id=user_friends.senderid OR users.id=user_friends.recieverid) AND NOT (users.id='${userId}')) WHERE ((user_friends.senderid='${userId}' OR user_friends.recieverid='${userId}') AND user_friends.request_status='0')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse(result);
    }
  );
}

function getPeopleList(userId, returnQueryResponse) {
  dbConnection.query(
    `SELECT users.id, users.name FROM users LEFT JOIN user_friends ON ((users.id=user_friends.senderid AND user_friends.recieverid='${userId}') OR (users.id=user_friends.recieverid AND user_friends.senderid='${userId}')) WHERE (NOT(users.id='${userId}') AND user_friends.request_status IS NULL)`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }

      returnQueryResponse(result);
    }
  );
}

function saveFriendRequest(senderId, recieverId, returnQueryResponse) {
  let dateTime = currentDate.getCurrentDate();
  dbConnection.query(
    `SELECT request_status FROM user_friends WHERE ((senderid='${senderId}' OR senderid='${recieverId}') AND (recieverid='${senderId}' OR recieverid='${recieverId}'))`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      const [queryResult] = result;

      if (!queryResult) {
        dbConnection.query(
          `INSERT INTO user_friends (senderid, recieverid, request_status) VALUES ('${senderId}', '${recieverId}', '0')`,
          function(err, result) {
            if (err) {
              return returnQueryResponse({ err: err });
            }
            dbConnection.query(
              `INSERT INTO user_notifications (userid, issuerid, action, target, targetid, date_time) VALUES ('${recieverId}', '${senderId}', 'sent', 'you friend request', '${senderId}', '${dateTime}' )`,
              function(err, result) {
                if (err) {
                  console.log('NEW FRIEND REQUEST NOTIFICATION WRITE FAILURE');
                }
                console.log('NEW FRIEND REQUEST NOTIFICATION WRITE SUCCESS');
              }
            );
            return returnQueryResponse({ msg: 'SUCCESS' });
          }
        );
      } else {
        returnQueryResponse({
          err: {
            status: 400
          }
        });
      }
    }
  );
}

function saveAcceptedFriendRequest(recieverId, senderId, returnQueryResponse) {
  let dateTime = currentDate.getCurrentDate();
  dbConnection.query(
    `UPDATE user_friends SET request_status='1' WHERE ((senderid='${senderId}' OR senderid='${recieverId}') AND (recieverid='${senderId}' OR recieverid='${recieverId}'))`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      dbConnection.query(
        `INSERT INTO user_notifications (userid, issuerid, action, target, targetid, date_time) VALUES ('${senderId}', '${recieverId}', 'accepted', 'your friend request', '${recieverId}', '${dateTime}' )`,
        function(err, result) {
          if (err) {
            console.log('FRIEND REQUEST ACCEPTED NOTIFICATION WRITE FAILURE');
          }
          console.log('FRIEND REQUEST ACCEPTED NOTIFICATION WRITE SUCCESS');
        }
      );
      returnQueryResponse({ msg: 'SUCCESS' });
    }
  );
}

function deleteFriendship(userId, friendId, returnQueryResponse) {
  dbConnection.query(
    `SELECT request_status FROM user_friends WHERE ((senderid='${friendId}' OR senderid='${userId}') AND (recieverid='${friendId}' OR recieverid='${userId}'))`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      const [friendStatus] = result;

      if (friendStatus) {
        dbConnection.query(
          `DELETE FROM user_friends WHERE ((senderid='${friendId}' OR senderid='${userId}') AND (recieverid='${friendId}' OR recieverid='${userId}'))`,
          function(err, result) {
            if (err) {
              return returnQueryResponse({ err: err });
            }
            return returnQueryResponse({ msg: 'SUCCESS' });
          }
        );
      } else {
        returnQueryResponse({
          err: {
            status: 400
          }
        });
      }
    }
  );
}

module.exports = {
  getFriendList,
  getRequestList,
  getPeopleList,
  saveFriendRequest,
  saveAcceptedFriendRequest,
  deleteFriendship
};
