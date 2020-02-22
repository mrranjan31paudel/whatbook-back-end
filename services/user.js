const query = require('./../queries/user');
const manageNestedReplies = require('./../utils/replyManager');
const filterUserPosts = require('./../utils/userPostFilter');
const formatDateTime = require('./../utils/dateFormatter');
const manageRequestList = require('./../utils/requestListManager');

function getUserDetails(user, callController) {
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

function getUserProfileDetails(user, ownerId, callController) {
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

function postUserStatus(user, postData, callController) {
  query.postUserStatus(user, postData, function (queryResponse) {
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

function getNewsFeed(user, callController) {
  query.getUserStories(user, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }
    formatDateTime(queryResponse);
    callController(queryResponse);
  });
}

function getUserPosts(user, ownerId, callController) {
  query.getUserStories(user, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }
    let filteredList = filterUserPosts(parseInt(ownerId), queryResponse);
    callController(filteredList);
  });
}

function postComment(user, data, callController) {
  query.saveComment(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }
    callController(queryResponse);
  })
}

function getComments(user, postId, callController) {
  query.getUserComments(user, postId, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }
    let managedList = manageNestedReplies(queryResponse);
    callController(managedList);
  });
}

function editPost(user, data, callController) {
  query.updateUserPost(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }
    callController(queryResponse);
  })
}

function editComment(user, data, callController) {
  query.updateUserComment(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }
    callController(queryResponse);
  })
}

function deletePost(user, data, callController) {
  query.deleteUserPost(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }
    callController(queryResponse);
  })
}

function deleteComment(user, data, callController) {
  query.deleteUserComment(user, data, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }
    callController(queryResponse);
  })
}

function saveFriendRequest(senderId, recieverId, callController) {
  query.saveFriendRequest(senderId, recieverId, function (queryResponse) {
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

function acceptFriendRequest(userId, senderId, callController) {
  query.saveAcceptedFriendRequest(userId, senderId, function (queryResponse) {
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

function deleteFriendship(userId, friendId, callController) {
  query.deleteFriendship(userId, friendId, function (queryResponse) {
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

function getFriendList(userId, callController) {
  query.getFriendList(userId, function (queryResponse) {
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

function getRequestList(userId, callController) {
  query.getRequestList(userId, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }

    let requestList = manageRequestList(userId, queryResponse);
    callController(requestList);
  });
}

function getNumberOfNewRequests(userId, callController) {
  query.getRequestList(userId, function (queryResponse) {
    if (queryResponse.err) {
      return callController({
        err: {
          status: 400
        }
      });
    }

    let requestList = manageRequestList(userId, queryResponse);
    callController({ numberOfUnansweredRequests: requestList.recievedList.length });
  });
}

function getPeopleList(userId, callController) {
  query.getPeopleList(userId, function (queryResponse) {
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

module.exports = { getUserDetails, getUserProfileDetails, postUserStatus, getNewsFeed, getUserPosts, postComment, getComments, editPost, editComment, deletePost, deleteComment, saveFriendRequest, acceptFriendRequest, deleteFriendship, getFriendList, getRequestList, getPeopleList, getNumberOfNewRequests };