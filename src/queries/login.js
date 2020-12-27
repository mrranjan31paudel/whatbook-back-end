const dbConnection = require('./../configs/db-initiations/config.db.connect');

function checkUserExistance(user, returnQueryResponse) {
  dbConnection.query(
    `SELECT id, email, password FROM users WHERE (email='${user.email}')`,
    function(err, result) {
      if (err) {
        return returnQueryResponse({
          err: {
            status: 500
          }
        });
      }
      let [user] = result;
      if (user) {
        returnQueryResponse(user);
      } else {
        returnQueryResponse({
          err: {
            status: 404,
            msg: 'USER_NOT_FOUND'
          }
        });
      }
    }
  );
}

function storeRefreshToken(userid, refreshToken, returnQueryResponse) {
  dbConnection.query(
    `INSERT INTO user_refresh_tokens (userid, refreshtoken) VALUES('${userid}', '${refreshToken}')`,
    function(err, _) {
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

module.exports = { checkUserExistance, storeRefreshToken };
