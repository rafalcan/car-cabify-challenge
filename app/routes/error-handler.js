/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }]*/

module.exports = (err, req, res, next) => {
  const env = req.app.get('env');
  const error = {
    status: err.status,
    message: err.message
  };

  if (env === 'development' && error.errors) {
    error.errors = err.errors;
  }

  res.status(err.status || 500).json(error);
};
