const User = require('../../src/users/entities/users.entity');
const UsersService = require('../../src/users/services/users.service');
const { getFakeUserData } = require('../fixtures/user.fixture');
const UserRepositoryMock = require('../mocks/user.repository.mock');

describe('users service', () => {
  describe('create method', () => {
    it('should create and return an user', async () => {
      expect.assertions(2);
      const userRepository = new UserRepositoryMock();
      const userService = new UsersService({
        mainUserRepository: userRepository,
        externalUserRepository: userRepository,
      });

      const data = getFakeUserData();

      const user = await userService.createUser(1, data);

      const fakeUser = new User({ id: 1, ...data });

      expect(userRepository.map.get(1)).toStrictEqual(fakeUser);
      expect(user).toStrictEqual(fakeUser);
    });
  });

  describe('update method', () => {
    it('should update and return an user', async () => {
      expect.assertions(2);
      const userRepository = new UserRepositoryMock();
      const userService = new UsersService({
        mainUserRepository: userRepository,
        externalUserRepository: userRepository,
      });

      const data = getFakeUserData();

      userRepository.map.set(1, new User({ id: 1, ...data }));

      const user = await userService.updateUser(1, {
        ...data,
        company: 'test2',
      });

      const fakeUser = new User({ id: 1, ...data, company: 'test2' });

      expect(userRepository.map.get(1)).toStrictEqual(fakeUser);
      expect(user).toStrictEqual(fakeUser);
    });
  });

  describe('delete method', () => {
    it('should delete an user', async () => {
      expect.assertions(1);
      const userRepository = new UserRepositoryMock();
      const userService = new UsersService({
        mainUserRepository: userRepository,
        externalUserRepository: userRepository,
      });

      const data = getFakeUserData();

      userRepository.map.set(1, new User({ id: 1, ...data }));

      await userService.deleteUser(1);

      expect(userRepository.map.size).toBe(0);
    });
  });

  describe('get method', () => {
    it('should get users from any of both repositories using their ids', async () => {
      expect.assertions(1);
      const userRepository = new UserRepositoryMock();
      const userService = new UsersService({
        mainUserRepository: userRepository,
        externalUserRepository: userRepository,
      });

      const data = getFakeUserData();

      userRepository.map.set(1, new User({ id: 1, ...data }));
      userRepository.map.set(2, new User({ id: 2, ...data }));

      const users = await userService.getUsers(['1', '2', '3']);

      expect(users).toHaveLength(2);
    });
  });
});
