const signupService = require('../services/signup');

function signupUser(req, res, next) {
  // To register
  const inputData = req.body;
  signupService(inputData, function(serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult.data);
  });
}

module.exports = { signupUser };
