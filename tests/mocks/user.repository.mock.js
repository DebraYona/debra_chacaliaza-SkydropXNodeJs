module.exports = class UserRepositoryMock {
  constructor() {
    this.map = new Map();
  }

  async save(user) {
    this.map.set(Number(user.id), user);
    return user;
  }

  async delete(user) {
    if (!this.map.get(Number(user.id))) return null;

    this.map.delete(Number(user.id));
    return undefined;
  }

  async get(ids) {
    return ids.map((id) => this.map.get(Number(id)) || null);
  }
};
