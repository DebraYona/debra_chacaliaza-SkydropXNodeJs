const UsersService = require('../../src/users/services/users.service');
const UserRepositoryMock = require('../mocks/user.repository.mock');

const getFakeUser = () => ({
  name: 'test',
  first_name: 'test',
  last_name: 'test',
  company: 'test',
  url: 'test',
  text: 'test',
});

describe('users service', () => {
  describe('create method', () => {
    it('should create and return an user', async () => {
      expect.assertions(2);
      const userRepository = new UserRepositoryMock();
      const userService = new UsersService({
        mainUserRepository: userRepository,
        externalUserRepository: userRepository,
      });

      const data = getFakeUser();

      const user = await userService.createUser(1, data);

      expect(userRepository.map[1]).toStrictEqual({ id: 1, ...data });
      expect(user).toStrictEqual({ id: 1, ...data });
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

      const data = getFakeUser();

      userRepository.map[1] = { id: 1, ...data };

      const user = await userService.updateUser(1, { ...data, name: 'test2' });

      expect(userRepository.map[1]).toStrictEqual({
        id: 1,
        ...data,
        name: 'test2',
      });
      expect(user).toStrictEqual({ id: 1, ...data, name: 'test2' });
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

      const data = getFakeUser();

      userRepository.map[1] = { id: 1, ...data };

      await userService.deleteUser(1);

      expect(userRepository.map).toStrictEqual({});
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

      const data = getFakeUser();

      userRepository.map[1] = { id: 1, ...data };
      userRepository.map[2] = { id: 1, ...data };

      const users = await userService.getUsers('1', '2', '3');

      expect(users).toHaveLength(2);
    });
  });
});
