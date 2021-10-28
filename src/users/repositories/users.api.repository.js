const User = require('../entities/users.entity');
const { ServerError } = require('../errors/users.errors');

module.exports = class UsersApiRepository {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async get(ids = []) {
    try {
      return await Promise.all(
        ids.map(async (id) => {
          try {
            const user = await this.apiClient.get(`/${id}`);

            const externalData = user.data;

            return new User(externalData.data);
          } catch (error) {
            console.error(error.message);

            if (error.response && error.response.status === 404) {
              return null;
            }
            throw error;
          }
        }),
      );
    } catch (error) {
      console.error(error);
      throw new ServerError();
    }
  }
};
