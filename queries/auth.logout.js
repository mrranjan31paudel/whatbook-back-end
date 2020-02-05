const DB_CONNECTOIN = require('../configs/db-initiations/config.db.connect');

function deleteRefreshToken(refreshToken, returnQueryResponse) {
  DB_CONNECTOIN.query(`DELETE FROM usersrefreshtokens WHERE refreshtoken='${refreshToken}'`, function (err, result) {
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
  })
}

module.exports = { deleteRefreshToken };