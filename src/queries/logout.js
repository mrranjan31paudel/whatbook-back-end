const dbConnection = require('../configs/db-initiations/config.db.connect');

function deleteRefreshToken(refreshToken, returnQueryResponse) {
  dbConnection.query(
    `DELETE FROM user_refresh_tokens WHERE refreshtoken='${refreshToken}'`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({
          err: {
            status: 500
          }
        });
      }
      returnQueryResponse({
        msg: 'SUCCESS'
      });
    }
  );
}

module.exports = { deleteRefreshToken };
