const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../config/database');
const { environment } = require('../../config/environment');
const ApiError = require('../../utils/ApiError');

const generateToken = (userId, role) => {
  return jwt.sign(
    { sub: userId, role },
    environment.jwtSecret,
    { expiresIn: environment.jwtExpiresIn },
  );
};

const register = async ({ email, password, role }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ApiError(409, 'A user with this email already exists.');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, passwordHash, role: role || 'USER' },
    select: { id: true, email: true, role: true, createdAt: true },
  });

  const token = generateToken(user.id, user.role);
  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const token = generateToken(user.id, user.role);
  return {
    user: { id: user.id, email: user.email, role: user.role },
    token,
  };
};

module.exports = { register, login };
