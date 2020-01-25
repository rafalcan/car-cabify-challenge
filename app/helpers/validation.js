const { validationResult } = require('express-validator');

const onlyJSON = (req, res, next) => {
  if (!req.is('application/json')) {
    const err = new Error('Not allowed content type');
    err.status = 400;
    next(err);
  }

  next();
};

const onlyForm = (req, res, next) => {
  if (!req.is('application/x-www-form-urlencoded')) {
    const err = new Error('Not allowed content type');
    err.status = 400;
    next(err);
  }

  next();
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Failure in the request format');
    err.status = 400;
    err.errors = errors.array();
    next(err);
  }

  next();
};

module.exports = {
  onlyJSON,
  onlyForm,
  validate
};
