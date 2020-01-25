const models = require('../database/models');

const read = async (req, res, next) => {
  try {
    await models.sequelize.authenticate();
    await models.sequelize.query('SELECT 1 FROM Cars LIMIT 0');
    await models.sequelize.query('SELECT 1 FROM Groups LIMIT 0');
    await models.sequelize.query('SELECT 1 FROM Journeys LIMIT 0');
    res.send();
  } catch (error) {
    const err = new Error('Failure in database');
    err.status = 500;
    next(err);
  }
};

module.exports = {
  read
};
