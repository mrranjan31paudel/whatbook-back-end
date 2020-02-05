const ROUTER = require('express').Router();
const USER_ROUTE = require('../components/user/routes/user');
const TO_REGISTER = require('./../controllers/register');
const TO_LOG_IN = require('./../controllers/login');
const AUTHENTICATE = require('../middlewares/auth.user');
const RENEW = require('../middlewares/auth.renew');
const LOGOUT = require('../middlewares/auth.logout');

ROUTER.use('/', function (req, res, next) {   //For Home Page.
  console.log('Inside API ');
  next();
});

ROUTER.use('/signup', TO_REGISTER);     //For links in registration.

ROUTER.use('/login', TO_LOG_IN);

ROUTER.use('/user', AUTHENTICATE, USER_ROUTE);    //For links in 'user component' further.

ROUTER.use('/tokenrenew', RENEW);

ROUTER.use('/logout', LOGOUT);

module.exports = ROUTER;