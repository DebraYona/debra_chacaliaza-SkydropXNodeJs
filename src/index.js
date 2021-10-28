process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

const { join } = require('path');

const envPath = join(
  process.cwd(),
  `.env.${process.env.NODE_ENV || 'development'}`,
);

require('dotenv').config({
  path: envPath,
});

const { configApp } = require('./app');
const { connectToMongo } = require('./db');
const { Openapi } = require('./openapi');

const start = async () => {
  await connectToMongo(process.env.MONGO_URI);
  const app = await configApp();

  app.use('/openapi', Openapi.ui, Openapi.setup());

  const port = Number(process.env.PORT || 80);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

start();
