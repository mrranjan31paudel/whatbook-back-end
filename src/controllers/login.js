const loginService = require('./../services/login');

function loginUser(req, res, next) {
  // To log in
  const inputData = req.body;
  loginService(inputData, function(serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult.data);
  });
}

module.exports = { loginUser };
