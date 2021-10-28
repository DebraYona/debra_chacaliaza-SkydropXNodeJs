const User = require('../entities/users.entity');
const { ServerError } = require('../errors/users.errors');

module.exports = class UsersMongoRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async save(user) {
    try {
      const newUser = await this.userModel.findOneAndUpdate(
        { id: user.id },
        user,
        { new: true, upsert: true },
      );
      return new User(newUser);
    } catch (error) {
      console.error(error);
      throw new ServerError();
    }
  }

  async delete(user) {
    try {
      return this.userModel.findOneAndDelete({ id: user.id });
    } catch (error) {
      console.error(error);
      throw new ServerError();
    }
  }

  async get(ids) {
    try {
      const users = await this.userModel.find({ id: { $in: ids } });

      return ids.map((id) => {
        const userForId = users.find((user) => user.id === Number(id));
        return userForId ? new User(userForId) : null;
      });
    } catch (error) {
      console.error(error);
      throw new ServerError();
    }
  }
};
