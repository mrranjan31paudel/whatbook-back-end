const dbConnection = require('./../../configs/db-initiations/config.db.connect');
const currentDate = require('./../../utils/currentDate');

function getUserComments(user, postId, returnQueryResponse) {
  dbConnection.query(
    `SELECT user_comments.id, user_comments.userid, users.name, user_comments.comment, user_comments.date_time, user_comments.parent_reply_id FROM users INNER JOIN user_comments ON users.id=user_comments.userid WHERE (user_comments.postid='${postId}') ORDER BY date_time`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse(result);
    }
  );
}

function saveComment(user, data, returnQueryResponse) {
  let dateTime = currentDate.getCurrentDate();

  if (data.parentCommentId) {
    dbConnection.query(
      `INSERT INTO user_comments (postid, userid, comment, date_time, parent_reply_id) VALUES ('${data.parentPostId}', '${user.id}', '${data.text}', '${dateTime}', '${data.parentCommentId}')`,
      function(err, result) {
        if (err) {
          return returnQueryResponse({ err: err });
        }

        if (user.id !== data.parentCommentOwnerId) {
          dbConnection.query(
            `INSERT INTO user_notifications (userid, issuerid, action, target, targetid, post_ownerid, date_time) VALUES('${data.parentCommentOwnerId}', '${user.id}', 'replied to', 'your comment', '${data.parentPostId}', '${data.postOwnerId}', '${dateTime}')`,
            function(err, result) {
              if (err) {
                console.log(
                  'NEW REPLY FOR COMMENT OWNER NOTIFICATION WRITE FAILURE'
                );
              }
              console.log(
                'NEW REPLY FOR COMMENT OWNER NOTIFICATION WRITE SUCCESS'
              );
            }
          );
        }

        if (user.id !== data.postOwnerId) {
          dbConnection.query(
            `INSERT INTO user_notifications (userid, issuerid, action, target, targetid, date_time) VALUES ('${data.postOwnerId}', '${user.id}', 'commented on', 'your post', '${data.parentPostId}', '${data.postOwnerId}', '${dateTime}')`,
            function(err, result) {
              if (err) {
                console.log(
                  'NEW REPLY FOR POST OWNER NOTIFICATION WRITE FAILURE'
                );
              }
              console.log(
                'NEW REPLY FOR POST OWNER NOTIFICATION WRITE SUCCESS'
              );
            }
          );
        }

        returnQueryResponse({ msg: 'SUCCESS' });
      }
    );
  } else {
    dbConnection.query(
      `INSERT INTO user_comments (postid, userid, comment, date_time) VALUES ('${data.parentPostId}', '${user.id}', '${data.text}', '${dateTime}')`,
      function(err, result) {
        if (err) {
          return returnQueryResponse({ err: err });
        }

        if (user.id !== data.postOwnerId) {
          dbConnection.query(
            `INSERT INTO user_notifications (userid, issuerid, action, target, targetid, post_ownerid, date_time) VALUES ('${data.postOwnerId}', '${user.id}', 'commented on', 'your post', '${data.parentPostId}', '${data.postOwnerId}', '${dateTime}')`,
            function(err, result) {
              if (err) {
                console.log(
                  'NEW COMMENT FOR POST OWNER NOTIFICATION WRITE FAILURE'
                );
              }
              console.log(
                'NEW COMMENT FOR POST OWNER NOTIFICATION WRITE SUCCESS'
              );
            }
          );
        }

        returnQueryResponse({ msg: 'SUCCESS' });
      }
    );
  }
}

function updateUserComment(user, commentData, returnQueryResponse) {
  dbConnection.query(
    `UPDATE user_comments SET comment='${commentData.newCommentText}' WHERE (userid='${user.id}' AND postid='${commentData.postId}' AND id='${commentData.commentId}')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    }
  );
}

function deleteUserComment(user, commentData, returnQueryResponse) {
  dbConnection.query(
    `DELETE FROM user_comments WHERE (id='${commentData.commentId}' AND (userid='${commentData.userId}' OR (SELECT user_posts.userid FROM user_posts WHERE (user_posts.userid='${commentData.postOwnerId}' AND user_posts.id='${commentData.postId}'))))`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      dbConnection.query(
        `DELETE FROM user_comments WHERE (parent_reply_id=${commentData.commentId})`,
        function(err, result) {
          if (err) {
            return returnQueryResponse({ err: err });
          }
          returnQueryResponse({ msg: 'SUCCESS' });
        }
      );
    }
  );
}

module.exports = {
  getUserComments,
  saveComment,
  updateUserComment,
  deleteUserComment
};
