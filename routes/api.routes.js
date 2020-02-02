const ROUTER = require('express').Router();
const USER_ROUTE = require('./../components/user/routes/user.route');
const TO_REGISTER = require('./../controllers/register.control');
const TO_LOG_IN = require('./../controllers/login.control');
const AUTHENTICATE = require('../middlewares/auth.user');
const RENEW = require('./../middlewares/auth.renew');

ROUTER.use('/', function(req, res, next){   //For Home Page.
    console.log('Inside API ');
    next();
});

ROUTER.use('/login', TO_LOG_IN);

ROUTER.use('/signup', TO_REGISTER);     //For links in registration.

ROUTER.use('/user', AUTHENTICATE, USER_ROUTE);    //For links in 'user component' further.

ROUTER.use('/tokenrenew', RENEW);

module.exports = ROUTER;