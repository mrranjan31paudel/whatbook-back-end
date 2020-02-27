const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const apiRoutes = require('./api.routes');
const createTables = require('./configs/db-initiations/config.db.createTable');
const cors = require('cors');

const { PORT } = require('./configs/config.structure');
//afsd

createTables.createTable();    //Creates table if doesnt exist.
app.use(logger('dev'));

app.use(cors());

app.use(express.urlencoded({    //Returns middleware that only parses urlencoded bodies and only 
    extended: true              //looks at requests where the Content-Type header matches the type option.
}));

app.use(express.json()); //Returns middleware>>only parses json, only looks at requests:Content-Type header = type option.

app.use('/files', express.static(path.join(__dirname, 'files')));   //To access static files.

app.use('/api', apiRoutes);    //Directs to api routes and services.


app.use(function (req, res, next) {   //Passes the Not Found(404) error to Error Handling Middleware.
    next({
        status: 404,
        msg: 'Not Found!'
    });
});

app.use(function (err, req, res, next) {  //(Error Handling Middleware): Sends response for every error of the app.
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

app.listen(PORT, function () {
    console.log(`Server is listening at PORT: ${PORT}`);
});