const User = require('../entities/users.entity');
const {
  InvalidUser,
  ServerError,
  UserNotFound,
} = require('../errors/users.errors');
const {
  isValidUser,
  isValidId,
  isValidOrder,
  isValidSortBy,
} = require('../validators/users.validators');

module.exports = class UsersService {
  constructor({ mainUserRepository, externalUserRepository }) {
    this.mainUserRepository = mainUserRepository;
    this.externalUserRepository = externalUserRepository;
  }

  async createUser(id, data) {
    if (!isValidId(id)) throw new InvalidUser();
    if (!isValidUser(data)) throw new InvalidUser();
    const usersQueryRepsonse = await this.mainUserRepository.get([id]);
    const oldUser = usersQueryRepsonse[0];

    if (oldUser) throw new InvalidUser();

    const newUser = new User({ ...data, id });

    if (!isValidUser(newUser)) throw new InvalidUser();
    return this.mainUserRepository.save(newUser);
  }

  async updateUser(id, data) {
    if (!isValidId(id)) throw new InvalidUser();
    const usersQueryRepsonse = await this.mainUserRepository.get([id]);
    const oldUser = usersQueryRepsonse[0];

    if (!oldUser) throw new UserNotFound();

    const newUser = new User({ ...oldUser, ...data, id });

    if (!isValidUser(newUser)) throw new InvalidUser();
    return this.mainUserRepository.save(newUser);
  }

  async deleteUser(id) {
    if (!isValidId(id)) throw new InvalidUser();

    const usersQueryRepsonse = await this.mainUserRepository.get([id]);
    const oldUser = usersQueryRepsonse[0];

    if (!oldUser) throw new UserNotFound();

    return this.mainUserRepository.delete(oldUser);
  }

  async getUsers(ids, extraOptions) {
    const areIdsValid = !ids.some((id) => !isValidId(id));
    if (!areIdsValid) throw new InvalidUser();

    const sortBy =
      extraOptions && extraOptions.sort_by ? extraOptions.sort_by : 'id';

    const order =
      extraOptions && extraOptions.order ? extraOptions.order : 'ASC';

    if (!isValidSortBy(sortBy)) throw new InvalidUser();
    if (!isValidOrder(order)) throw new InvalidUser();

    const numberIds = ids.map((id) => Number(id));

    const usersFromMainRepo = await this.mainUserRepository.get(numberIds);

    const missingIds = numberIds.filter(
      (id) => !usersFromMainRepo.some((user) => !!user && user.id === id),
    );

    const usersFromExternalRepo = await this.externalUserRepository.get(
      missingIds,
    );

    const actualUsersFromExternalRepo = usersFromExternalRepo.filter(
      (user) => !!user,
    );

    if (actualUsersFromExternalRepo.length > 0)
      this.saveExternalUsers(actualUsersFromExternalRepo);

    const users = [
      ...usersFromMainRepo.filter((user) => !!user),
      ...actualUsersFromExternalRepo,
    ];

    return this.sortUsers(users, sortBy, order);
  }

  async saveExternalUsers(users) {
    try {
      await Promise.all(
        users.map((user) => this.mainUserRepository.save(user)),
      );
    } catch (error) {
      console.error(error);
    }
  }

  sortUsers(users, sortBy, order) {
    const orderFactor = order === 'DESC' ? -1 : 1;

    return [...users].sort(
      (a, b) =>
        String(a[sortBy]).localeCompare(String(b[sortBy])) * orderFactor,
    );
  }
};
