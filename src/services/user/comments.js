const query = require('./../../queries/user/comments');
const manageNestedReplies = require('./../../utils/replyManager');

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

module.exports = { getComments, postComment, editComment, deleteComment };