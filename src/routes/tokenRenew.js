const router = require('express').Router();

const tokenRenewController = require('./../controllers/tokenRenew');

router.route('/').post(tokenRenewController.renewTokens);

module.exports = router;
