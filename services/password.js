const BCRYPT = require('bcryptjs');

function encryptPassword(inputPassword, hashReturnFunction) {

  BCRYPT.genSalt(10, function (err, salt) {
    if (err) {
      return hashReturnFunction({ err: err });
    }
    BCRYPT.hash(inputPassword, salt, function (err, hashedPassword) {
      if (err) {
        return hashReturnFunction({ err: err });
      }
      hashReturnFunction(hashedPassword);
    });
  });
}

function decryptPassword(inputPassword, hashedPassword, hashReturnFunction) {

  BCRYPT.compare(inputPassword, hashedPassword, function (err, result) {
    if (err) {
      return hashReturnFunction({ err: err });
    }
    hashReturnFunction(result);
  });
}

module.exports = { encryptPassword, decryptPassword };