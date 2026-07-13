const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should return 400 for invalid email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'not-an-email', password: 'password123' });
      expect(res.status).toBe(400);
    });

    it('should return 400 for short password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'test@test.com', password: '123' });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should return 400 for missing password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'test@test.com' });
      expect(res.status).toBe(400);
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'nonexistent@test.com', password: 'password123' });
      expect(res.status).toBe(401);
    });
  });
});
