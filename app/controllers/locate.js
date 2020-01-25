const { body } = require('express-validator');
const { onlyForm, validate } = require('../helpers/validation');
const models = require('../database/models');

const create = async (req, res, next) => {
  try {
    const groupId = req.body.ID;
    const group = await models.Groups.findOne({
      include: ['journey'],
      where: {
        id: groupId
      }
    });

    if (group) {
      if (group.journey) {
        // Group found and with the car assigned.
        const car = await models.Cars.findOne({where: {id: group.journey.carId}});
        return res.json(car);
      }

      // Group found and is waiting to be assigned to a car.
      return res.status(204).send();
    }

    // Group is not found
    res.status(404).send();
  } catch (error) {
    const err = new Error('Failed to process the request');
    err.status = 400;
    next(err);
  }
};

module.exports = {
  create: [
    onlyForm,
    body('ID').isInt().toInt(),
    validate,
    create
  ]
};
