const request = require('supertest');
const server = require('../server');
const models = require('../database/models');

describe('Locate behaviors', () => {
  beforeAll(async () => {
    await request(server)
      .put(`/cars`)
      .send([
        {
          'id': 1,
          'seats': 4
        }
      ]);
    await request(server)
      .post(`/journey`)
      .send({
        'id': 1,
        'people': 4
      });
    await request(server)
      .post(`/journey`)
      .send({
        'id': 2,
        'people': 4
      });
  });

  afterAll(async () => {
    await models.sequelize.close();
  });

  it('should find a group and car', async () => {
    const res = await request(server)
      .post(`/locate`)
      .type('form')
      .send({
        'ID': 1
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should only find a group', async () => {
    const res = await request(server)
      .post(`/locate`)
      .type('form')
      .send({
        'ID': 2
      });
    expect(res.statusCode).toEqual(204);
  });

  it('should respond with 400 if content-type is wrong', async () => {
    const res = await request(server)
      .post(`/locate`)
      .type('application/json');
    expect(res.statusCode).toEqual(400);
  });

  it('should respond with 400 if request malformed', async () => {
    const res = await request(server)
      .post(`/locate`)
      .type('form')
      .send({
        'ID': 'one'
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should respond with 404 if ID not found', async () => {
    const res = await request(server)
      .post(`/locate`)
      .type('form')
      .send({
        'ID': 3
      });
    expect(res.statusCode).toEqual(404);
  });

  it('should respond with 405 if method is not allowed', async () => {
    const res = await request(server)
      .put(`/locate`);
    expect(res.statusCode).toEqual(405);
  });
});
