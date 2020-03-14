const tokenRenewServices = require('./../services/tokenRenew');

function renewTokens(req, res, next) {
  let refreshToken = req.body.refreshToken;
  tokenRenewServices.renewTokens(refreshToken, function(serviceResult) {
    if (serviceResult.err) {
      return next(serviceResult.err);
    }
    res.send(serviceResult.data);
  });
}

module.exports = { renewTokens };
