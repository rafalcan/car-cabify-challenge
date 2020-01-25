const { body } = require('express-validator');
const { onlyJSON, validate } = require('../helpers/validation');
const models = require('../database/models');

const update = async (req, res, next) => {
  try {
    // Cars registered correctly
    await models.Cars.destroy({where: {}});
    await models.Groups.destroy({where: {}});
    await models.Cars.bulkCreate(req.body);
    res.send();
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
  update: [
    onlyJSON,
    body().isArray(),
    body('*.id').isInt().toInt(),
    body('*.seats').isInt({min: 4, max: 6}).toInt(),
    validate,
    update
  ]
};
