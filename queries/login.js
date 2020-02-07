const DB_CONNECTION = require('../configs/db-initiations/config.db.connect');

function checkUserExistance(user, returnQueryResponse) {
  DB_CONNECTION.query(`SELECT id, email, password FROM users WHERE (email='${user.email}')`, function (err, result) {
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
    }
    else {
      returnQueryResponse({
        err: {
          status: 401
        }
      })
    }
  });
}

function storeRefreshToken(userid, refreshToken, returnQueryResponse) {
  DB_CONNECTION.query(`INSERT INTO user_refresh_tokens (userid, refreshtoken) VALUES('${userid}', '${refreshToken}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 500
        }
      });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

module.exports = { checkUserExistance, storeRefreshToken };