const router = require('express').Router();

const signUpController = require('./../controllers/signup');

router.route('/').post(signUpController.signupUser);

module.exports = router;
