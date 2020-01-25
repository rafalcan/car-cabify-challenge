const { body } = require('express-validator');
const { onlyJSON, validate } = require('../helpers/validation');
const models = require('../database/models');
const Op = models.Sequelize.Op;

const create = async (req, res, next) => {
  try {
    const notInQuery = models.sequelize.literal('SELECT carId FROM Journeys');
    const group = await models.Groups.create(req.body);
    const cars = await models.Cars.findOne({
      order: [['seats', 'ASC']],
      where: {
        id: {
          [Op.notIn]: [notInQuery]
        },
        seats: {
          [Op.gte]: group.people
        }
      }
    });

    if (cars) {
      // Group and Journey are registered correctly
      await models.Journeys.create({
        carId: cars.id,
        groupId: group.id
      });
      return res.send();
    }

    // Group registered correctly
    res.status(202).send();
  } catch (error) {
    const err = new Error('Failed to process the request');
    err.status = 400;

    if (error.name == 'SequelizeUniqueConstraintError') {
      err.errors = error.errors;
    }

    next(err);
  }
};

module.exports = {
  create: [
    onlyJSON,
    body('id').isInt().toInt(),
    body('people').isInt({min: 1, max: 6}).toInt(),
    validate,
    create
  ]
};
