const {app, server} = require ('./app');
const request = require('supertest');

describe('/', () => {
  test('GET', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200)
  });
})

afterAll(() => {
  server.close()
});
