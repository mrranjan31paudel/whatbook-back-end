const QUERY = require('./../queries/user');

function insertNewUser() {
    QUERY.insert();
}

function getUserDetails(userId, userIdReturnFunction) {
    QUERY.getUser(userId, function (userDetails) {
        userIdReturnFunction(userDetails);
    });
}

module.exports = { insertNewUser, getUserDetails };