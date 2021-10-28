const HttpClient = require('../helpers/http.client');
const UsersApiRepository = require('./repositories/users.api.repository');
const UsersMongoRepository = require('./repositories/users.mongo.repository');
const createUsersRouter = require('./routers/users.router');
const UsersModel = require('./schemas/users.schema');
const UsersService = require('./services/users.service');

const createUsersModule = (axiosInstance) => {
  const usersExternalApiClient = new HttpClient('https://reqres.in/api/users');

  const usersMongoRepository = new UsersMongoRepository(UsersModel);
  const usersApiRepository = new UsersApiRepository(usersExternalApiClient);
  const usersService = new UsersService({
    mainUserRepository: usersMongoRepository,
    externalUserRepository: usersApiRepository,
  });

  return createUsersRouter(usersService);
};

module.exports = createUsersModule;
