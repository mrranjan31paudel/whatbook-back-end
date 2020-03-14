const router = require('express').Router();

const logoutController = require('../controllers/logout');

router.route('/').post(logoutController.logoutUser);

module.exports = router;
