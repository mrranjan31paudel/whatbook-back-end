const DB_CONNECTION = require('./../configs/db-initiations/config.db.connect');
const {encryptPassword} = require('./password.control');
const ROUTER = require('express').Router();

ROUTER.route('/')
    .get(function(req, res, next){
        console.log('Inside REGISTER GET');
        res.send('Your Registration page will appear here');
    })
    .post(function(req, res, next){     // To register
        encryptPassword(req.body.password, function(hashedPassword){
            const inputData = {
                name: req.body.name,
                dob: req.body.dob,
                email: req.body.email,
                password: hashedPassword
            }
            console.log('reg body: ', inputData);
            DB_CONNECTION.query(`INSERT INTO users (name, dob, email, password) VALUES('${inputData.name}', '${inputData.dob}', '${inputData.email}', '${inputData.password}')`, function(err, result){
                if(err) {
                    next({
                        msg: err.code,
                        status: 406
                    });
                }
                else{
                    res.send({
                        msg: 'SIGNUP_SUCCESS',
                    });
                }
            });
        });
    });

module.exports = ROUTER;