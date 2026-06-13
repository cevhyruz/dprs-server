const AppError = require('../core/app-error.class');
const { HTTP, MESSAGES } = require('../utils/messages.util');

const notFound = (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  console.warn(`[${req.method}] Invalid route accessed: ${req.method} ${fullUrl}`);
  // Pass a proper AppError to the error handler
  return next(new AppError(
    `The requested URL ${req.method} ${req.originalUrl} was not found on this server.`,
    HTTP.NOT_FOUND
  ));
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      status: err.status,
      message: err.message
    });
  }
  console.log('QMS Error: ', err);
  return res.status(500).send({
    status: 'error',
    message: 'Something went wrong on our end. Please try again later',
  });
}

module.exports =  { notFound, errorHandler } ;

