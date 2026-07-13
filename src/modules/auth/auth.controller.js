const catchAsync = require('../../utils/catchAsync');
const authService = require('./auth.service');

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  res.json({
    status: 'success',
    message: 'Login successful',
    data: result,
  });
});

module.exports = { register, login };
