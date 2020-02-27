const router = require('express').Router();

const userRoutes = require('./routes/user');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const refreshAccessTokenRoutes = require('./routes/tokenRenew');
const logoutRoutes = require('./routes/logout');

const authenticate = require('./middlewares/auth.user');

router.use('/', function (req, res, next) {   //For Home Page.
  next();
});

router.use('/signup', signupRoutes);     //For links in registration.

router.use('/login', loginRoutes);

router.use('/user', authenticate, userRoutes);    //For links in 'user component' further.

router.use('/tokenrenew', refreshAccessTokenRoutes);

router.use('/logout', logoutRoutes);

module.exports = router;