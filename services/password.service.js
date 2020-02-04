const BCRYPT = require('bcryptjs');

function encryptPassword(inputPassword, hashReturnFunction){
    BCRYPT.genSalt(10, function(err, salt) {
        BCRYPT.hash(inputPassword, salt, function(err, hashedPassword) {
            hashReturnFunction(hashedPassword);
        });
    });
}

function decryptPassword(inputPassword, hashedPassword, hashReturnFunction){
    let doesMatch = BCRYPT.compareSync(inputPassword, hashedPassword)
    hashReturnFunction(doesMatch);
}

module.exports = {encryptPassword, decryptPassword};