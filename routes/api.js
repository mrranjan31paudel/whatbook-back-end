const ROUTER = require('express').Router();
const user = require('./../controllers/user');
const signup = require('../controllers/signup');
const login = require('./../controllers/login');
const authenticate = require('../middlewares/auth.user');
const refreshAccessToken = require('../middlewares/auth.renew');
const logout = require('../middlewares/auth.logout');

ROUTER.use('/', function (req, res, next) {   //For Home Page.
  console.log('Inside API ');
  next();
});

ROUTER.use('/signup', signup);     //For links in registration.

ROUTER.use('/login', login);

ROUTER.use('/user', authenticate, user);    //For links in 'user component' further.

ROUTER.use('/tokenrenew', refreshAccessToken);

ROUTER.use('/logout', logout);

module.exports = ROUTER;