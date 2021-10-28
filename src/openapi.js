const path = require('path');
const { serve, setup } = require('swagger-ui-express');
const YAML = require('yamljs');

const Openapi = {
  setup: () => {
    const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yml'));
    return setup(swaggerDocument);
  },
  ui: serve,
};

module.exports = {
  Openapi,
};
