module.exports = (req, res, next) => {
  const err = new Error('Method not allowed');
  err.status = 405;
  next(err);
};
