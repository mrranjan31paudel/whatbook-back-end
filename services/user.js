const query = require('./../queries/user');
const manageNestedReplies = require('./../utils/replyManager');

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
    let managedList = [];
    manageNestedReplies(queryResponse, managedList);
    callController(managedList);
  });
}

function editPost(user, data, callController) {
  query.updateUserPost(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    callController(queryResponse);
  })
}

function editComment(user, data, callController) {
  query.updateUserComment(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    callController(queryResponse);
  })
}

function deletePost(user, data, callController) {
  query.deleteUserPost(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    callController(queryResponse);
  })
}

function deleteComment(user, data, callController) {
  query.deleteUserComment(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    callController(queryResponse);
  })
}

module.exports = { getUserDetails, postUserStatus, getNewsFeed, postComment, getComments, editPost, editComment, deletePost, deleteComment };