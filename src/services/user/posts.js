const query = require('./../../queries/user/posts');
const filterUserPosts = require('./../../utils/userPostFilter');
const formatDateTime = require('./../../utils/dateFormatter');

function postUserStatus(user, postData, callController) {
  query.postUserStatus(user, postData, function(queryResponse) {
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

function getUserPosts(user, requestParams, callController) {
  if (requestParams && requestParams.userId) {
    query.getUserStories(user, function(queryResponse) {
      if (queryResponse.err) {
        return callController({
          err: {
            status: 400
          }
        });
      }
      let filteredList = filterUserPosts(
        parseInt(requestParams.ownerId),
        queryResponse
      );
      callController(filteredList);
    });
  } else if (requestParams && requestParams.ownerId && requestParams.postId) {
    query.getSpecificPost(
      user.id,
      parseInt(requestParams.ownerId),
      parseInt(requestParams.postId),
      function(queryResponse) {
        if (queryResponse.err) {
          return callController({
            err: {
              status: 400
            }
          });
        }

        if (queryResponse.length > 0) {
          formatDateTime(queryResponse);
          let userPost = queryResponse;

          return callController(userPost);
        } else {
          callController({
            err: {
              status: 404
            }
          });
        }
      }
    );
  } else {
    query.getUserStories(user, function(queryResponse) {
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
}

function editPost(user, data, callController) {
  query.updateUserPost(user, data, function(queryResponse) {
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

function deletePost(user, data, callController) {
  query.deleteUserPost(user, data, function(queryResponse) {
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

module.exports = { getUserPosts, postUserStatus, editPost, deletePost };
