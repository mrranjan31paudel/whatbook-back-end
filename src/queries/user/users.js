const dbConnection = require('./../../configs/db-initiations/config.db.connect');

function getUserPassword(userId, returnQueryResponse) {
  dbConnection.query(`SELECT password FROM users WHERE id='${userId}'`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    const [password] = result;
    returnQueryResponse(password.password);
  });
}

function changeUserPassword(userId, newPassword, oldPassword, returnQueryResponse) {
  dbConnection.query(`UPDATE users SET password='${newPassword}' WHERE (id='${userId}' AND password='${oldPassword}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }

    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

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

function changeUserName(userId, newName, returnQueryResponse) {
  dbConnection.query(`UPDATE users SET name='${newName}' WHERE id='${userId}'`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse({ msg: 'SUCCESS' })
  });
}

function changeUserDOB(userId, newDate, returnQueryResponse) {
  dbConnection.query(`UPDATE users SET dob='${newDate}' WHERE id='${userId}'`, function (err, result) {
    if (err) {
      return returnQueryResponse({ err: err });
    }
    returnQueryResponse({ msg: 'SUCCESS' })
  });
}

module.exports = { getUserPassword, getUserHomeDetails, getUserProfileDetails, changeUserPassword, changeUserName, changeUserDOB };