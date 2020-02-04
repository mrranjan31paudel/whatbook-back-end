const ROUTER = require('express').Router();
const DB_CONNECTOIN = require('./../configs/db-initiations/config.db.connect');

ROUTER.route('/')
  .post(function(req, res, next){
    if(req.body.refreshToken){
      const refreshToken = req.body.refreshToken;
      DB_CONNECTOIN.query(`DELETE FROM usersrefreshtokens WHERE refreshtoken='${refreshToken}'`, function(err, result){
        if(err) throw err;
        res.send({
          msg: 'logged Out'
        });
      })
    }
  })

module.exports = ROUTER;