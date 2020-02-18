const dbConnection = require('./../configs/db-initiations/config.db.connect');
const currentDate = require('./../utils/currentDate');

function getUserHomeDetails(user, returnQueryResponse) {
  dbConnection.query(`SELECT id, name, dob, email FROM users WHERE (id='${user.id}' AND email='${user.email}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    const [userDetails] = result;
    returnQueryResponse(userDetails);
  });
}

function getUserProfileDetails(userId, returnQueryResponse) {
  dbConnection.query(`SELECT id, name, dob, email FROM users WHERE (id='${userId}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    const [userDetails] = result;
    if (!userDetails) {
      return returnQueryResponse({
        err: {
          status: 404
        }
      });
    }
    returnQueryResponse(userDetails);
  })
}

function postUserStatus(user, postData, returnQueryResponse) {
  let dateTime = currentDate.getCurrentDate();

  dbConnection.query(`INSERT INTO user_posts (userid, content, date_time) VALUES('${user.id}', '${postData}', '${dateTime}' )`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

function getUserStories(user, returnQueryResponse) {
  dbConnection.query(`SELECT user_posts.id, user_posts.userid, users.name, user_posts.date_time, user_posts.content FROM users INNER JOIN user_posts ON users.id=user_posts.userid ORDER BY date_time DESC`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    returnQueryResponse(result);
  });
}

function saveComment(user, data, returnQueryResponse) {
  let dateTime = currentDate.getCurrentDate();
  if (data.parentCommentId) {
    dbConnection.query(`INSERT INTO user_comments (postid, userid, comment, date_time, parent_reply_id) VALUES ('${data.parentPostId}', '${user.id}', '${data.text}', '${dateTime}', '${data.parentCommentId}')`, function (err, result) {
      if (err) {
        return returnQueryResponse({
          err: {
            status: 400
          }
        });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    });
  }
  else {
    dbConnection.query(`INSERT INTO user_comments (postid, userid, comment, date_time) VALUES ('${data.parentPostId}', '${user.id}', '${data.text}', '${dateTime}')`, function (err, result) {
      if (err) {
        return returnQueryResponse({
          err: {
            status: 400
          }
        });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    });
  }
}

function getUserComments(user, postId, returnQueryResponse) {
  dbConnection.query(`SELECT user_comments.id, user_comments.userid, users.name, user_comments.comment, user_comments.date_time, user_comments.parent_reply_id FROM users INNER JOIN user_comments ON users.id=user_comments.userid WHERE (user_comments.postid='${postId}') ORDER BY date_time`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    returnQueryResponse(result);
  });
}

function updateUserPost(user, postData, returnQueryResponse) {
  dbConnection.query(`UPDATE user_posts SET content='${postData.newPostText}' WHERE (userid='${user.id}' AND id='${postData.postId}')`, function (err, result) {
    if (err) {
      console.log('post update error: ', err);
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

function updateUserComment(user, commentData, returnQueryResponse) {
  dbConnection.query(`UPDATE user_comments SET comment='${commentData.newCommentText}' WHERE (userid='${user.id}' AND postid='${commentData.postId}' AND id='${commentData.commentId}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

function deleteUserPost(user, postData, returnQueryResponse) {
  dbConnection.query(`DELETE FROM user_comments WHERE (postid='${postData.postId}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    dbConnection.query(`DELETE FROM user_posts WHERE (id='${postData.postId}' AND userid='${user.id}')`, function (err, result) {
      if (err) {
        return returnQueryResponse({
          err: {
            status: 400
          }
        });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    });
  });
}

function deleteUserComment(user, commentData, returnQueryResponse) {
  dbConnection.query(`DELETE FROM user_comments WHERE (id='${commentData.commentId}' AND (userid='${commentData.userId}' OR (SELECT user_posts.userid FROM user_posts WHERE (user_posts.userid='${commentData.postOwnerId}' AND user_posts.id='${commentData.postId}'))))`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

module.exports = { getUserHomeDetails, getUserProfileDetails, postUserStatus, getUserStories, saveComment, getUserComments, updateUserPost, updateUserComment, deleteUserPost, deleteUserComment };