const {app} = require ('./app');
const request = require('supertest');

test('get index', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200)
})