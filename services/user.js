const query = require('./../queries/user');
const manageNestedReplies = require('./../utils/replyManager');
const filterUserPosts = require('./../utils/userPostFilter');

function getUserDetails(user, callController) {
  query.getUserHomeDetails(user, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    const dateJoin = `${queryResponse.dob}`.split(' ', 4).join(' ');
    queryResponse = {
      ...queryResponse,
      dob: dateJoin
    }
    callController(queryResponse);
  });
}

function getUserProfileDetails(user, ownerId, callController) {
  query.getUserProfileDetails(ownerId, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    console.log('USER IDS: ', user.id, ownerId);
    const dateJoin = `${queryResponse.dob}`.split(' ', 4).join(' ');
    queryResponse = {
      ...queryResponse,
      dob: dateJoin,
      isOwner: user.id == ownerId ? true : false
    }

    callController(queryResponse);
  })
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

function getUserPosts(user, ownerId, callController) {
  query.getUserStories(user, function (queryResponse) {
    if (queryResponse.err) {
      return callController({ err: queryResponse.err });
    }
    let filteredList = filterUserPosts(parseInt(ownerId), queryResponse);
    callController(filteredList);
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
    let managedList = manageNestedReplies(queryResponse);

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

module.exports = { getUserDetails, getUserProfileDetails, postUserStatus, getNewsFeed, getUserPosts, postComment, getComments, editPost, editComment, deletePost, deleteComment };