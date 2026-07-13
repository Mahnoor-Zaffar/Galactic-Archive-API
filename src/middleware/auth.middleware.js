const jwt = require('jsonwebtoken');
const { environment } = require('../config/environment');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const prisma = require('../config/database');

const authenticate = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authentication required. Provide a valid Bearer token.');
  }

  const token = authHeader.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, environment.jwtSecret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Token expired. Please login again.');
    }
    throw new ApiError(401, 'Invalid token.');
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
  if (!user) {
    throw new ApiError(401, 'User belonging to this token no longer exists.');
  }

  req.user = user;
  next();
});

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    throw new ApiError(403, 'You do not have permission to perform this action.');
  }
  next();
};

module.exports = { authenticate, authorize };
