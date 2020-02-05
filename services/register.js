const { encryptPassword } = require('./password');
const query = require('../queries/register');

function registerService(inputUserData, callController) {
  encryptPassword(inputUserData.password, function (hashedPassword) {
    if (hashedPassword.err) {
      return callController({ err: hashedPassword.err });
    }
    inputUserData = {
      ...inputUserData,
      password: hashedPassword
    }
    query.storeUserData(inputUserData, function (queryResponse) {
      if (queryResponse.err) {
        return callController({ err: queryResponse.err });
      }
      callController({ data: queryResponse });
    });
  });
}

module.exports = registerService;