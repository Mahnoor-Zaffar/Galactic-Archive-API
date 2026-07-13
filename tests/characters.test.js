const request = require('supertest');
const app = require('../src/app');

describe('Characters Endpoints', () => {
  describe('GET /api/v1/characters', () => {
    it('should return paginated characters', async () => {
      const res = await request(app).get('/api/v1/characters');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
      expect(res.body.pagination).toHaveProperty('page');
      expect(res.body.pagination).toHaveProperty('limit');
      expect(res.body.pagination).toHaveProperty('total');
    });

    it('should respect pagination params', async () => {
      const res = await request(app).get('/api/v1/characters?page=1&limit=5');
      expect(res.status).toBe(200);
      expect(res.body.pagination.limit).toBe(5);
    });

    it('should enforce max limit', async () => {
      const res = await request(app).get('/api/v1/characters?limit=200');
      expect(res.status).toBe(200);
      expect(res.body.pagination.limit).toBe(100);
    });
  });

  describe('GET /api/v1/characters/:id', () => {
    it('should return 404 for non-existent character', async () => {
      const res = await request(app).get('/api/v1/characters/00000000-0000-0000-0000-000000000000');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/v1/characters', () => {
    it('should return 401 without auth', async () => {
      const res = await request(app)
        .post('/api/v1/characters')
        .send({ name: 'Test' });
      expect(res.status).toBe(401);
    });
  });
});
