const DB_CONNECTION = require('../configs/db-initiations/config.db.connect');

function storeUserData(user, returnQueryResponse) {
  DB_CONNECTION.query(`INSERT INTO users (name, dob, email, password) VALUES('${user.name}', '${user.dob}', '${user.email}', '${user.password}')`, function (err, result) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return returnQueryResponse({
          err: {
            status: 401
          }
        })
      }
      return returnQueryResponse({
        err: {
          status: 500
        }
      });
    }
    returnQueryResponse({ msg: 'SUCCESS' });
  });
}

module.exports = { storeUserData };