const dbConnection = require('./../configs/db-initiations/config.db.connect');
const currentDate = require('./../utils/currentDate');

function getUserHomeDetails(user, returnQueryResponse) {
  console.log('user: ', user);
  dbConnection.query(`SELECT name, dob, email FROM users WHERE (id='${user.id}' AND email='${user.email}')`, function (err, result) {
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
  dbConnection.query(`SELECT user_posts.id, users.name, user_posts.date_time, user_posts.content FROM users INNER JOIN user_posts ON users.id=user_posts.userid ORDER BY date_time DESC`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    console.log(result);
    returnQueryResponse(result);
  });
}

function saveComment(user, data, returnQueryResponse) {
  let dateTime = currentDate.getCurrentDate();

  dbConnection.query(`INSERT INTO user_comments (postid, userid, comment, date_time) VALUES ('${data.postId}', '${user.id}', '${data.commentText}', '${dateTime}')`, function (err, result) {
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

function getUserComments(user, postId, returnQueryResponse) {
  dbConnection.query(`SELECT user_comments.id, users.name, user_comments.comment, user_comments.date_time FROM users INNER JOIN user_comments ON users.id=user_comments.userid WHERE (user_comments.postid='${postId}') ORDER BY date_time`, function (err, result) {
    if (err) {
      console.log('get comments error: ', err);
      return returnQueryResponse({
        err: {
          status: 400
        }
      });
    }
    console.log('get comments result: ', result);
    returnQueryResponse(result);
  });
}

module.exports = { getUserHomeDetails, postUserStatus, getUserStories, saveComment, getUserComments };