module.exports = class UserRepositoryMock {
  constructor() {
    this.map = {};
  }

  create(user) {
    if (this.map[user.id]) throw new Error('User already exists');

    this.map[user.id] = user;
  }

  update(user) {
    if (!this.map[user.id]) throw new Error('User doesnt exist');

    this.map[user.id] = user;
  }

  delete(id) {
    if (!this.map[id]) throw new Error('User doesnt exist');

    delete this.map[id];
  }

  get(ids) {
    return ids.map((id) => this.map[id]);
  }
};
