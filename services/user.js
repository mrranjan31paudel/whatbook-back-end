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

function postComment(user, data, callController) {
  query.saveComment(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    callController(queryResponse);
  })
}

function getComments(user, postId, callController) {
  query.getUserComments(user, postId, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    callController(queryResponse);
  });
}

module.exports = { getUserDetails, postUserStatus, getNewsFeed, postComment, getComments };