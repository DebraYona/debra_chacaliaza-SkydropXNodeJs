const express = require('express');
const { globalErrorHandler } = require('./helpers/error.handler');

const configApp = async () => {
  const app = express();

  app.use(express.json());


  app.use(globalErrorHandler);

  return app;
};

module.exports = {
  configApp,
};
