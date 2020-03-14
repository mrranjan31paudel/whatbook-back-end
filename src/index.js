const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

const apiRoutes = require('./api.routes');
const createTables = require('./configs/db-initiations/config.db.createTable');
const handleErrors = require('./middlewares/errorHandler');

const { PORT } = require('./configs/config.structure');

const app = express();

createTables.createTable(); //Creates table if doesnt exist.
app.use(logger('dev'));

app.use(cors());

app.use(
  express.urlencoded({
    //Returns middleware that only parses urlencoded bodies and only
    extended: true //looks at requests where the Content-Type header matches the type option.
  })
);

app.use(express.json()); //Returns middleware>>only parses json, only looks at requests:Content-Type header = type option.

app.use('/files', express.static(path.join(__dirname, 'files'))); //To access static files.

app.use('/api', apiRoutes); //Directs to api routes and services.

app.use(function(req, res, next) {
  //Passes the Not Found(404) error to Error Handling Middleware.
  next({
    status: 404,
    msg: 'Not Found!'
  });
});

app.use(handleErrors); //(Error Handling Middleware): Sends response for every error of the app.

app.listen(PORT, function() {
  console.log(`Server is listening at PORT: ${PORT}`);
});
