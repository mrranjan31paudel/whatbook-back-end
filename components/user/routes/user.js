const USER_CONTROLLER = require('../controllers/user');

const ROUTER = require('express').Router();

ROUTER.route('/')
    .get(function (req, res, next) {
        USER_CONTROLLER.getUserDetails(res.user, function (userDetails) {
            console.log('User Details: ', userDetails);
            res.send(userDetails);
        });
    })
    .post(function (req, res, next) {
        console.log('to post something');
        res.send('Inside USER POST');
    });

ROUTER.route('/:id')
    .get(function (req, res, next) {
        console.log('Inside USER/ID GET.');
        res.send('Inside USER: ' + req.params.id);
    })
    .post(function (req, res, next) {
        console.log('Inside USER/ID POST.')
        res.send('Inside USER/ID POST.');
    });

module.exports = ROUTER;