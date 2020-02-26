const ROUTER = require('express').Router();

const userRoutes = require('./routes/user');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const refreshAccessTokenRoutes = require('./routes/tokenRenew');
const logoutRoutes = require('./routes/logout');

const authenticate = require('./middlewares/auth.user');

ROUTER.use('/', function (req, res, next) {   //For Home Page.
  console.log('Inside API ');
  next();
});

ROUTER.use('/signup', signupRoutes);     //For links in registration.

ROUTER.use('/login', loginRoutes);

ROUTER.use('/user', authenticate, userRoutes);    //For links in 'user component' further.

ROUTER.use('/tokenrenew', refreshAccessTokenRoutes);

ROUTER.use('/logout', logoutRoutes);

module.exports = ROUTER;