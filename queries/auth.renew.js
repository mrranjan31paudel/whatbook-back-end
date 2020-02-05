const DB_CONNECTION = require('../configs/db-initiations/config.db.connect');

function checkTokenExistance(refreshToken, returnQueryResponse) {
  DB_CONNECTION.query(`SELECT userid FROM usersrefreshtokens WHERE(refreshtoken='${refreshToken}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 500
        }
      });
    }
    let [userid] = result;
    if (userid) {
      return returnQueryResponse(userid)
    }
    else {
      return returnQueryResponse({
        err: {
          status: 401
        }
      });
    }
  });
}

function deleteExpiredToken(refreshToken, userid, returnQueryResponse) {
  DB_CONNECTION.query(`DELETE FROM usersrefreshtokens WHERE(refreshtoken='${refreshToken}' AND userid='${userid}')`, function (err, result) {
    if (err) {
      return returnQueryResponse({
        err: {
          status: 500
        }
      });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  })
}

function storeNewRefreshToken(newRefreshToken, refreshToken, returnQueryResponse) {
  DB_CONNECTION.query(`UPDATE usersrefreshtokens SET refreshtoken='${newRefreshToken}' WHERE refreshtoken='${refreshToken}'`, function (err, result) {
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

module.exports = { checkTokenExistance, deleteExpiredToken, storeNewRefreshToken };