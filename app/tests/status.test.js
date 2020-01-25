const request = require('supertest');
const server = require('../server');
const models = require('../database/models');

describe('Default behaviors', () => {
  afterAll(async () => {
    await models.sequelize.close();
  });

  it('should respond with 200 if app is ready', async () => {
    const res = await request(server)
      .get(`/status`);
    expect(res.statusCode).toEqual(200);
  });

  it('should respond with 404 if resource is not found', async () => {
    const res = await request(server)
      .get(`/home`);
    expect(res.statusCode).toEqual(404);
  });

  it('should respond with 405 if method is not allowed', async () => {
    const res = await request(server)
      .post(`/status`);
    expect(res.statusCode).toEqual(405);
  });
});
