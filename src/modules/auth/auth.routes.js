const express = require('express');
const { register, login } = require('./auth.controller');
const validate = require('../../middleware/validate.middleware');
const { registerSchema, loginSchema } = require('./auth.validation');
const { authLimiter } = require('../../middleware/rateLimiter.middleware');

const router = express.Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);

module.exports = router;
