const QUERY = require('./../queries/user.queries');

function insertNewUser(){
    QUERY.insert();
}

function getUserDetails(userId, userIdReturnFunction){
    QUERY.getUser(userId, function(userDetails){
        userIdReturnFunction(userDetails);
    });
}

function renewTokens(refreshToken, accessToken){

}

module.exports = {insertNewUser, getUserDetails};