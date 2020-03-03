const dbConnection = require('./../../configs/db-initiations/config.db.connect');
const currentDate = require('./../../utils/currentDate');

function getUserStories(user, returnQueryResponse) {
  dbConnection.query(`SELECT user_posts.id, user_posts.userid, users.name, user_posts.date_time, user_posts.content FROM users INNER JOIN user_friends ON ((users.id=user_friends.senderid OR users.id=user_friends.recieverid) AND NOT (users.id='${user.id}')) INNER JOIN user_posts WHERE ((user_friends.senderid='${user.id}' AND user_friends.recieverid=user_posts.userid OR user_friends.recieverid='${user.id}' AND user_friends.senderid=user_posts.userid) AND user_friends.request_status='1') UNION SELECT user_posts.id, user_posts.userid, users.name, user_posts.date_time, user_posts.content FROM users INNER JOIN user_posts ON (users.id='${user.id}' AND user_posts.userid='${user.id}' ) ORDER BY date_time DESC`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse(result);
  });
}

function getSpecificPost(userId, ownerId, postId, returnQueryResponse) {
  dbConnection.query(`SELECT request_status FROM user_friends WHERE ((senderid='${userId}' AND recieverid='${ownerId}') OR (senderid='${ownerId}' AND recieverid='${userId}'))`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }

    if (result.length > 0 || userId === ownerId) {
      dbConnection.query(`SELECT user_posts.id, user_posts.userid, users.name, user_posts.date_time, user_posts.content FROM users INNER JOIN user_posts ON (users.id='${ownerId}' AND user_posts.userid='${ownerId}') WHERE (user_posts.id='${postId}')`, function (err, result) {
        if (err) {
          return returnQueryResponse({ err: err });
        }

        return returnQueryResponse(result);
      });
    }
    else {
      returnQueryResponse(result);
    }
  });
}

function postUserStatus(user, postData, returnQueryResponse) {
  let dateTime = currentDate.getCurrentDate();

  dbConnection.query(`INSERT INTO user_posts (userid, content, date_time) VALUES('${user.id}', '${postData}', '${dateTime}' )`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

function updateUserPost(user, postData, returnQueryResponse) {
  dbConnection.query(`UPDATE user_posts SET content='${postData.newPostText}' WHERE (userid='${user.id}' AND id='${postData.postId}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

function deleteUserPost(user, postData, returnQueryResponse) {
  dbConnection.query(`DELETE FROM user_comments WHERE (postid='${postData.postId}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    dbConnection.query(`DELETE FROM user_posts WHERE (id='${postData.postId}' AND userid='${user.id}')`, function (err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    });
  });
}

module.exports = { getUserStories, getSpecificPost, postUserStatus, updateUserPost, deleteUserPost };