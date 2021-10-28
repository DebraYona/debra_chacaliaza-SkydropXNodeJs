const express = require('express');
const { globalErrorHandler } = require('./helpers/error.handler');
const createUsersModule = require('./users');

const configApp = async () => {
  const app = express();

  // TODO: falta un corso
  app.use(express.json());

  const usersRouter = createUsersModule();

  app.use('/api/users', usersRouter);

  app.use(globalErrorHandler);

  return app;
};

module.exports = {
  configApp,
};
