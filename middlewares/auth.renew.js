const JWT = require('jsonwebtoken');

const renewAccessToken = function(req, res, next){
    let refreshToken = req.body.refreshToken;
    // JWT.verify(refreshToken, )
    
}

module.exports = renewAccessToken;