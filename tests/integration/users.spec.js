/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable jest/no-hooks */
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server-global-4.4');
const mongoose = require('mongoose');
const { connectToMongo } = require('../../src/db');
const { configApp } = require('../../src/app');
const { getFakeUserData } = require('../fixtures/user.fixture');

describe('users module', () => {
  let fakeMemoryDB;
  beforeAll(async () => {
    fakeMemoryDB = await MongoMemoryServer.create();
    await connectToMongo(fakeMemoryDB.getUri());
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await fakeMemoryDB.stop();
  });

  describe('POST /api/users/:id', () => {
    it('should return json with status 400 if no body is sent', async () => {
      expect.assertions(2);

      const app = await configApp();
      const res = await supertest(app)
        .post('/api/users/1')
        .set('Accept', 'application/json');

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(400);
    });

    it('should return json with status 400 if body is invalid', async () => {
      expect.assertions(2);

      const app = await configApp();
      const res = await supertest(app)
        .post('/api/users/1')
        .set('Accept', 'application/json')
        .send({ company: 1111 });

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(400);
    });

    it('should return json with status 201', async () => {
      expect.assertions(2);

      const app = await configApp();
      const res = await supertest(app)
        .post('/api/users/1')
        .set('Accept', 'application/json')
        .send(getFakeUserData());

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(201);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should return status code 200 and json with updated user', async () => {
      expect.assertions(3);

      const app = await configApp();

      await supertest(app)
        .post('/api/users/1')
        .set('Accept', 'application/json')
        .send(getFakeUserData());

      const res = await supertest(app)
        .put('/api/users/1')
        .set('Accept', 'application/json')
        .send({ company: 'new name' });

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(200);
      expect(res.body.data.company).toBe('new name');
    });
    it('should return status code 400 if body is invalid', async () => {
      expect.assertions(2);
      const app = await configApp();

      await supertest(app)
        .post('/api/users/1')
        .set('Accept', 'application/json')
        .send(getFakeUserData());

      const res = await supertest(app)
        .put('/api/users/1')
        .set('Accept', 'application/json')
        .send({ company: 1111 });

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(400);
    });
    it('should return status code 400 if id is invalid', async () => {
      expect.assertions(2);
      const app = await configApp();

      await supertest(app)
        .post('/api/users/1')
        .set('Accept', 'application/json')
        .send(getFakeUserData());

      const res = await supertest(app)
        .put('/api/users/aaa')
        .set('Accept', 'application/json')
        .send({ company: 1111 });

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(400);
    });
    it('should return status code 404 if id doesnt exist', async () => {
      expect.assertions(2);
      const app = await configApp();
      const res = await supertest(app)
        .put('/api/users/999')
        .set('Accept', 'application/json')
        .send({ company: 1111 });

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should return status code 200', async () => {
      expect.assertions(2);
      const app = await configApp();

      await supertest(app)
        .post('/api/users/1')
        .set('Accept', 'application/json')
        .send(getFakeUserData());

      const res = await supertest(app)
        .delete('/api/users/1')
        .set('Accept', 'application/json');

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(200);
    });
    it('should return status code 400 if id is invalid', async () => {
      expect.assertions(2);
      const app = await configApp();
      const res = await supertest(app)
        .delete('/api/users/aaa')
        .set('Accept', 'application/json');

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(400);
    });
    it('should return status code 404 if id doesnt exist', async () => {
      expect.assertions(2);
      const app = await configApp();
      const res = await supertest(app)
        .delete('/api/users/999')
        .set('Accept', 'application/json');

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/users/:ids', () => {
    it('should return status code 200 and json with all found users', async () => {
      expect.assertions(3);

      const app = await configApp();
      const res = await supertest(app)
        .get('/api/users/1,2,999')
        .set('Accept', 'application/json');

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
    });
    it('should return status code 400 if ids are invalid', async () => {
      expect.assertions(2);
      const app = await configApp();
      const res = await supertest(app)
        .get('/api/users/1,v')
        .set('Accept', 'application/json');

      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(400);
    });
  });
});
