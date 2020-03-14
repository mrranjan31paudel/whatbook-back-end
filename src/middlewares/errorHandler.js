function handleErrors(err, req, res, next) {
  console.log('IN ERROR HANDLING MIDDLEWARE: ', err);
  if (
    err.status === 401 &&
    (err.msg === 'TOKEN_EXPIRED' || err.msg === 'INVALID_PASSWORD')
  ) {
    res.status(err.status).send({
      msg: err.msg
    });
  } else if (err.status === 404 && err.msg === 'USER_NOT_FOUND') {
    res.status(err.status).send({
      msg: err.msg
    });
  } else {
    res.status(err.status).send();
  }
}

module.exports = handleErrors;
