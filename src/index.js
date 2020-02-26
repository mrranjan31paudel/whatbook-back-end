const EXPRESS = require('express');
const APP = EXPRESS();
const LOGGER = require('morgan');
const PATH = require('path');
const API_ROUTES = require('./api.routes');
const CREATE_USER_TABLE = require('./configs/db-initiations/config.db.createTable');
const CORS = require('cors');

const PORT = 9090;
//afsd

CREATE_USER_TABLE.createTable();    //Creates table if doesnt exist.
APP.use(LOGGER('dev'));

APP.use(CORS());

APP.use(EXPRESS.urlencoded({    //Returns middleware that only parses urlencoded bodies and only 
    extended: true              //looks at requests where the Content-Type header matches the type option.
}));

APP.use(EXPRESS.json()); //Returns middleware>>only parses json, only looks at requests:Content-Type header = type option.

APP.use('/files', EXPRESS.static(PATH.join(__dirname, 'files')));   //To access static files.

APP.use('/api', API_ROUTES);    //Directs to api routes and services.


APP.use(function (req, res, next) {   //Passes the Not Found(404) error to Error Handling Middleware.
    next({
        status: 404,
        msg: 'Not Found!'
    });
});

APP.use(function (err, req, res, next) {  //(Error Handling Middleware): Sends response for every error of the app.
    console.log('err status: ', err.status);
    if (err.status === 401 && (err.msg === 'TOKEN_EXPIRED' || err.msg === 'INVALID_PASSWORD')) {
        res.status(err.status).send({
            msg: err.msg
        });
    }
    else if (err.status === 404 && err.msg === 'USER_NOT_FOUND') {
        res.status(err.status).send({
            msg: err.msg
        })
    }
    else {
        res.status(err.status).send();
    }

});

APP.listen(PORT, function () {
    console.log('INSIDE SRC');
    console.log(`Server is listening at PORT: ${PORT}`);
});