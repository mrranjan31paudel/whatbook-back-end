const query = require('../queries/logout');

function logoutUser(refreshToken, callBackMiddleware) {
  query.deleteRefreshToken(refreshToken, function (queryResponse) {
    if (queryResponse.err) {
      return callBackMiddleware({ err: queryResponse.err });
    }
    callBackMiddleware({
      data: {
        msg: 'LOGGED_OUT'
      }
    });
  });
}

module.exports = { logoutUser };