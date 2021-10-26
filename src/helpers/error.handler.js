const HttpError = require('./http.error');

const globalErrorHandler = (err, req, res, next) => {
  console.error('Error Handler');
  console.error(err);

  const status = err instanceof HttpError ? err.statusCode : 500;
  const message = err.message ? err.message : 'Something went wrong';

  res.status(status).json({
    statusCode: status,
    message,
  });
};

module.exports = {
  globalErrorHandler,
};
