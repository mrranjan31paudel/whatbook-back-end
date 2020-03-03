const query = require('./../../queries/user/friends');
const manageRequestList = require('./../../utils/requestListManager');

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

module.exports = { getFriendList, getRequestList, getNumberOfNewRequests, getPeopleList, saveFriendRequest, acceptFriendRequest, deleteFriendship };