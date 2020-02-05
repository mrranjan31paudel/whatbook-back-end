const DB_CONNECTION = require('../../../configs/db-initiations/config.db.connect');

function insert() {

}

function getUser(userId, userIdReturnFunction) {
    console.log('userID: ', userId);
    DB_CONNECTION.query(`SELECT * FROM users WHERE (id='${userId.id}' and email='${userId.email}')`, function (err, result) {
        if (err) next({
            msg: 'TOKEN_INVALID',
            status: 400
        });
        else if (result) {
            const [resultData] = result;
            userIdReturnFunction({
                name: resultData.name,
                dob: resultData.dob,
                email: resultData.email
            });
        }
    })
}

module.exports = { insert, getUser };