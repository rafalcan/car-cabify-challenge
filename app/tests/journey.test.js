const request = require('supertest');
const server = require('../server');
const models = require('../database/models');

describe('Journey behaviors', () => {
  beforeAll(async () => {
    await request(server)
      .put(`/cars`)
      .send([
        {
          'id': 1,
          'seats': 4
        }
      ]);
  });

  afterAll(async () => {
    await models.sequelize.close();
  });

  it('should register a journey', async () => {
    const res = await request(server)
      .post(`/journey`)
      .send({
        'id': 1,
        'people': 4
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should only register a group', async () => {
    const res = await request(server)
      .post(`/journey`)
      .send({
        'id': 2,
        'people': 4
      });
    expect(res.statusCode).toEqual(202);
  });

  it('should respond with 400 if content-type is wrong', async () => {
    const res = await request(server)
      .post(`/journey`)
      .type('application/x-www-form-urlencoded');
    expect(res.statusCode).toEqual(400);
  });

  it('should respond with 400 if request malformed', async () => {
    const res = await request(server)
      .post(`/journey`)
      .send({
        'id': 1
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should respond with 400 if db constraint is violated', async () => {
    const res = await request(server)
      .post(`/journey`)
      .send({
        'id': 1,
        'people': 4
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should respond with 405 if method is not allowed', async () => {
    const res = await request(server)
      .put(`/journey`);
    expect(res.statusCode).toEqual(405);
  });
});
