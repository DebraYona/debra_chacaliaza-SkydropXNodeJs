const express = require('express');
const { globalErrorHandler } = require('./helpers/error.handler');
const createUsersModule = require('./users');
const cors = require('cors');

const configApp = async () => {
  const app = express();

  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );

  app.use(express.json());

  const usersRouter = createUsersModule();

  app.use('/api/users', usersRouter);

  app.use(globalErrorHandler);

  return app;
};

module.exports = {
  configApp,
};
