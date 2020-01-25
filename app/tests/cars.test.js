const request = require('supertest');
const server = require('../server');
const models = require('../database/models');

describe('Cars behaviors', () => {
  afterAll(async () => {
    await models.sequelize.close();
  });

  it('should update the cars', async () => {
    const res = await request(server)
      .put(`/cars`)
      .send([
        {
          'id': 1,
          'seats': 4
        },
        {
          'id': 2,
          'seats': 6
        }
      ]);
    expect(res.statusCode).toEqual(200);
  });

  it('should respond with 400 if content-type is wrong', async () => {
    const res = await request(server)
      .put(`/cars`)
      .type('application/x-www-form-urlencoded');
    expect(res.statusCode).toEqual(400);
  });

  it('should respond with 400 if body is not a array', async () => {
    const res = await request(server)
      .put(`/cars`)
      .send({
        'id': 1,
        'seats': 4
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should respond with 400 if request malformed', async () => {
    const res = await request(server)
      .put(`/cars`)
      .send([
        {
          'id': 1
        },
        {
          'id': 2,
          'seats': '6'
        }
      ]);
    expect(res.statusCode).toEqual(400);
  });

  it('should respond with 400 if db constraint is violated', async () => {
    const res = await request(server)
      .put(`/cars`)
      .send([
        {
          'id': 1,
          'seats': 4
        },
        {
          'id': 1,
          'seats': 6
        }
      ]);
    expect(res.statusCode).toEqual(400);
  });

  it('should respond with 405 if method is not allowed', async () => {
    const res = await request(server)
      .post(`/cars`);
    expect(res.statusCode).toEqual(405);
  });
});
