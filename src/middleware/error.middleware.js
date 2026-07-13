const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
    const message = err.message || 'Internal Server Error';
    err = new ApiError(statusCode, message, err.errors);
  }
  next(err);
};

const errorHandler = (err, req, res, _next) => {
  const { statusCode = 500, message, details } = err;

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  const response = {
    status: 'error',
    statusCode,
    message,
    ...(details && { details }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

module.exports = { errorConverter, errorHandler, notFoundHandler };
