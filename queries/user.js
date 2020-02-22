const dbConnection = require('./../configs/db-initiations/config.db.connect');
const currentDate = require('./../utils/currentDate');

function getUserHomeDetails(user, returnQueryResponse) {
  dbConnection.query(`SELECT id, name, dob, email FROM users WHERE (id='${user.id}' AND email='${user.email}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    const [userDetails] = result;
    returnQueryResponse(userDetails);
  });
}

function getUserProfileDetails(userId, ownerId, returnQueryResponse) {
  dbConnection.query(`SELECT id, name, dob, email FROM users WHERE (id='${ownerId}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }

    let [userDetails] = result;
    if (userDetails && userId !== ownerId) {

      dbConnection.query(`SELECT senderid, recieverid, request_status FROM user_friends WHERE ((senderid='${userId}' OR senderid='${ownerId}') AND (recieverid='${userId}' OR recieverid='${ownerId}'))`, function (err, result) {
        if (err) {
          return returnQueryResponse({ err: err });
        }

        const [friendStatus] = result;
        if (friendStatus) {
          userDetails = {
            ...userDetails,
            friendStatus: friendStatus
          }
        }
        return returnQueryResponse(userDetails);
      })
    }
    else {
      returnQueryResponse(userDetails);
    }
  })
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

function getUserStories(user, returnQueryResponse) {
  dbConnection.query(`SELECT user_posts.id, user_posts.userid, users.name, user_posts.date_time, user_posts.content FROM users INNER JOIN user_friends ON ((users.id=user_friends.senderid OR users.id=user_friends.recieverid) AND NOT (users.id='${user.id}')) INNER JOIN user_posts WHERE ((user_friends.senderid='${user.id}' AND user_friends.recieverid=user_posts.userid OR user_friends.recieverid='${user.id}' AND user_friends.senderid=user_posts.userid) AND user_friends.request_status='1') UNION SELECT user_posts.id, user_posts.userid, users.name, user_posts.date_time, user_posts.content FROM users INNER JOIN user_posts ON (users.id='${user.id}' AND user_posts.userid='${user.id}' ) ORDER BY date_time DESC`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse(result);
  });
}

function saveComment(user, data, returnQueryResponse) {
  let dateTime = currentDate.getCurrentDate();
  if (data.parentCommentId) {
    dbConnection.query(`INSERT INTO user_comments (postid, userid, comment, date_time, parent_reply_id) VALUES ('${data.parentPostId}', '${user.id}', '${data.text}', '${dateTime}', '${data.parentCommentId}')`, function (err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    });
  }
  else {
    dbConnection.query(`INSERT INTO user_comments (postid, userid, comment, date_time) VALUES ('${data.parentPostId}', '${user.id}', '${data.text}', '${dateTime}')`, function (err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    });
  }
}

function getUserComments(user, postId, returnQueryResponse) {
  dbConnection.query(`SELECT user_comments.id, user_comments.userid, users.name, user_comments.comment, user_comments.date_time, user_comments.parent_reply_id FROM users INNER JOIN user_comments ON users.id=user_comments.userid WHERE (user_comments.postid='${postId}') ORDER BY date_time`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse(result);
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

function updateUserComment(user, commentData, returnQueryResponse) {
  dbConnection.query(`UPDATE user_comments SET comment='${commentData.newCommentText}' WHERE (userid='${user.id}' AND postid='${commentData.postId}' AND id='${commentData.commentId}')`, function (err, result) {
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

function deleteUserComment(user, commentData, returnQueryResponse) {
  dbConnection.query(`DELETE FROM user_comments WHERE (id='${commentData.commentId}' AND (userid='${commentData.userId}' OR (SELECT user_posts.userid FROM user_posts WHERE (user_posts.userid='${commentData.postOwnerId}' AND user_posts.id='${commentData.postId}'))))`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    dbConnection.query(`DELETE FROM user_comments WHERE (parent_reply_id=${commentData.commentId})`, function (err, result) {
      if (err) {
        return returnQueryResponse({ err: err });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    });
  });
}

function saveFriendRequest(senderId, recieverId, returnQueryResponse) {
  dbConnection.query(`SELECT request_status FROM user_friends WHERE ((senderid='${senderId}' OR senderid='${recieverId}') AND (recieverid='${senderId}' OR recieverid='${recieverId}'))`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    const [queryResult] = result;
    console.log('ADD FRIEND RESULT: ', queryResult);
    if (!queryResult) {
      dbConnection.query(`INSERT INTO user_friends (senderid, recieverid, request_status) VALUES ('${senderId}', '${recieverId}', '0')`, function (err, result) {
        if (err) {
          return returnQueryResponse({ err: err });
        }
        return returnQueryResponse({ msg: 'SUCCESS' });
      });
    }
    else {
      returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
  });
}

function saveAcceptedFriendRequest(recieverId, senderId, returnQueryResponse) {
  dbConnection.query(`UPDATE user_friends SET request_status='1' WHERE ((senderid='${senderId}' OR senderid='${recieverId}') AND (recieverid='${senderId}' OR recieverid='${recieverId}'))`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

function deleteFriendship(userId, friendId, returnQueryResponse) {
  dbConnection.query(`SELECT request_status FROM user_friends WHERE ((senderid='${friendId}' OR senderid='${userId}') AND (recieverid='${friendId}' OR recieverid='${userId}'))`, function (err, result) {
    if (err) {
      // console.l
      return returnQueryResponse({ err: err });
    }
    const [friendStatus] = result;
    console.log('DELETE RESULT: ', friendStatus);
    if (friendStatus) {
      dbConnection.query(`DELETE FROM user_friends WHERE ((senderid='${friendId}' OR senderid='${userId}') AND (recieverid='${friendId}' OR recieverid='${userId}'))`, function (err, result) {
        if (err) {
          return returnQueryResponse({ err: err });
        }
        return returnQueryResponse({ msg: 'SUCCESS' });
      });
    }
    else {
      returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
  });
}

function getFriendList(userId, returnQueryResponse) {
  dbConnection.query(`SELECT users.id, users.name FROM users INNER JOIN user_friends ON ((users.id=user_friends.senderid OR users.id=user_friends.recieverid) AND NOT (users.id='${userId}')) WHERE ((user_friends.senderid='${userId}' OR user_friends.recieverid='${userId}') AND user_friends.request_status='1')`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse(result);
  });
}

function getRequestList(userId, returnQueryResponse) {
  dbConnection.query(`SELECT users.id, users.name, user_friends.senderid, user_friends.recieverid FROM users INNER JOIN user_friends ON ((users.id=user_friends.senderid OR users.id=user_friends.recieverid) AND NOT (users.id='${userId}')) WHERE ((user_friends.senderid='${userId}' OR user_friends.recieverid='${userId}') AND user_friends.request_status='0')`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse(result);
  });
}

function getPeopleList(userId, returnQueryResponse) {
  dbConnection.query(`SELECT users.id, users.name FROM users LEFT JOIN user_friends ON ((users.id=user_friends.senderid AND user_friends.recieverid='${userId}') OR (users.id=user_friends.recieverid AND user_friends.senderid='${userId}')) WHERE (NOT(users.id='${userId}') AND user_friends.request_status IS NULL)`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    console.log('PEOPLE LIST: ', result);
    returnQueryResponse(result);
  });
}

module.exports = { getUserHomeDetails, getUserProfileDetails, postUserStatus, getUserStories, saveComment, getUserComments, updateUserPost, updateUserComment, deleteUserPost, deleteUserComment, saveFriendRequest, saveAcceptedFriendRequest, deleteFriendship, getFriendList, getRequestList, getPeopleList };