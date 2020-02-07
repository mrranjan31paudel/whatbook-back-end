const query = require('./../queries/user');

function getUserDetails(user, callController) {
  query.getUserHomeDetails(user, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    callController(queryResponse);
  });
}

function postUserStatus(user, postData, callController) {
  query.postUserStatus(user, postData, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    callController(queryResponse);
  });
}

function getNewsFeed(user, callController) {
  query.getUserStories(user, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    callController(queryResponse);
  });
}

module.exports = { getUserDetails, postUserStatus, getNewsFeed };