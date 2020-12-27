const { encryptPassword } = require('./../utils/password');
const query = require('../queries/signup');

function signupService(inputUserData, callController) {
  encryptPassword(inputUserData.password, function(hashedPassword) {
    if (hashedPassword.err) {
      return callController({ err: hashedPassword.err });
    }
    inputUserData = {
      ...inputUserData,
      password: hashedPassword
    };
    query.storeUserData(inputUserData, function(queryResponse) {
      if (queryResponse.err) {
        return callController({ err: queryResponse.err });
      }
      callController({ data: queryResponse });
    });
  });
}

module.exports = signupService;
