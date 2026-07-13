const request = require('supertest');
const app = require('../src/app');

describe('App', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/v1/nonexistent');
    expect(res.status).toBe(404);
  });

  it('should have CORS headers', async () => {
    const res = await request(app).options('/api/v1/health');
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });
});
