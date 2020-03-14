const dbConnection = require('../configs/db-initiations/config.db.connect');

function checkTokenExistance(refreshToken, returnQueryResponse) {
  dbConnection.query(
    `SELECT userid FROM user_refresh_tokens WHERE(refreshtoken='${refreshToken}')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({
          err: {
            status: 500
          }
        });
      }
      let [userid] = result;
      if (userid) {
        return returnQueryResponse(userid);
      } else {
        return returnQueryResponse({
          err: {
            status: 401
          }
        });
      }
    }
  );
}

function deleteExpiredToken(refreshToken, userid, returnQueryResponse) {
  dbConnection.query(
    `DELETE FROM user_refresh_tokens WHERE(refreshtoken='${refreshToken}' AND userid='${userid}')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({
          err: {
            status: 500
          }
        });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    }
  );
}

function storeNewRefreshToken(
  newRefreshToken,
  refreshToken,
  returnQueryResponse
) {
  dbConnection.query(
    `UPDATE user_refresh_tokens SET refreshtoken='${newRefreshToken}' WHERE refreshtoken='${refreshToken}'`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({
          err: {
            status: 500
          }
        });
      }
      returnQueryResponse({ msg: 'SUCCESS' });
    }
  );
}

module.exports = {
  checkTokenExistance,
  deleteExpiredToken,
  storeNewRefreshToken
};
