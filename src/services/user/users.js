const query = require('./../../queries/user/users');
const { encryptPassword, decryptPassword } = require('./../../utils/password');

function getUserDetails(user, requestParams, callController) {
  if (requestParams && requestParams.id) {
    let ownerId = parseInt(requestParams.id);
    query.getUserProfileDetails(user.id, ownerId, function (queryResponse) {
      if (queryResponse && queryResponse.err) {
        return callController({
          err: {
            status: 400
          }
        });
      }
      if (!queryResponse) {
        return callController({
          err: {
            status: 404
          }
        });
      }

      const dateJoin = `${queryResponse.dob}`.split(' ', 4).join(' ');
      queryResponse = {
        ...queryResponse,
        dob: dateJoin,
        isOwner: user.id == ownerId ? true : false,
        isFriend: queryResponse.friendStatus && queryResponse.friendStatus.request_status === 1 ? true : false,
        isRequestSent: queryResponse.friendStatus && queryResponse.friendStatus.request_status === 0 && queryResponse.friendStatus.senderid === user.id ? true : false,
        isRequestRecieved: queryResponse.friendStatus && queryResponse.friendStatus.request_status === 0 && queryResponse.friendStatus.recieverid === user.id ? true : false
      }

      callController(queryResponse);
    })
  }
  else {
    query.getUserHomeDetails(user, function (queryResponse) {
      if (queryResponse && queryResponse.err) {
        return callController({
          err: {
            status: 400
          }
        });
      }
      const dateJoin = `${queryResponse.dob}`.split(' ', 4).join(' ');
      queryResponse = {
        ...queryResponse,
        dob: dateJoin
      }
      callController(queryResponse);
    });
  }
}

function changeUserData(userId, changeInfo, callController) {

  if (changeInfo.type === 'name') {
    query.changeUserName(userId, changeInfo.submitData, function (queryResponse) {
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
  else if (changeInfo.type === 'dob') {
    query.changeUserDOB(userId, changeInfo.submitData, function (queryResponse) {
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
  else if (changeInfo.type === 'password') {
    query.getUserPassword(userId, function (encryptedPassword) {
      if (encryptedPassword.err) {

        return callController({
          err: {
            status: 500 // If user eists password should also exist, so a query error will be server error in this case.
          }
        });
      }
      decryptPassword(changeInfo.submitData.currentPassword, encryptedPassword, function (doesMatch) {
        if (doesMatch.err) {

          return callController({
            err: {
              status: 500 //unable to decrypt password
            }
          });
        }
        else if (doesMatch) {
          encryptPassword(changeInfo.submitData.newPassword, function (newEncryptedPassword) {
            if (newEncryptedPassword.err) {
              return callController({
                err: {
                  status: 500 //being unable to hash password
                }
              });
            }
            query.changeUserPassword(userId, newEncryptedPassword, encryptedPassword, function (queryResponse) {
              if (queryResponse.err) {
                return callController({
                  err: {
                    status: 500
                  }
                });
              }
              return callController(queryResponse);
            });
          });
        }
        else {
          callController({
            err: {
              status: 400
            }
          });
        }
      });
    });
  }
}

module.exports = { getUserDetails, changeUserData };