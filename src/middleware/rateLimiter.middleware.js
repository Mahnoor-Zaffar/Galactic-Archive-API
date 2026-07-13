const rateLimit = require('express-rate-limit');
const { environment } = require('../config/environment');

const apiLimiter = rateLimit({
  windowMs: environment.rateLimitWindowMs,
  max: environment.rateLimitMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    statusCode: 429,
    message: 'Too many requests. Please try again later.',
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    statusCode: 429,
    message: 'Too many authentication attempts. Please try again in 15 minutes.',
  },
});

module.exports = { apiLimiter, authLimiter };
