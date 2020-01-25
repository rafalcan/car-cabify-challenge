const express = require('express');
const bodyParser = require('body-parser');

const routes = require('../routes');
const notFound = require('../routes/not-found');
const errorHandler = require('../routes/error-handler');

const app = express();

// Middlewares
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Catch 404
app.use(notFound);

// Catch everything else
app.use(errorHandler);

module.exports = app;
