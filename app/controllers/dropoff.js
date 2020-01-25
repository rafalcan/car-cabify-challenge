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
      // Group is unregistered correctly
      await models.Groups.destroy({where: {id: groupId}});

      if (group.journey) {
        // Group and Journey are unregistered correctly
        await models.Journeys.destroy({where: {id: group.journey.id}});
      }

      return res.send();
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
