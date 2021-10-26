/* eslint-disable jest/no-hooks */
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server-global-4.4');
const mongoose = require('mongoose');
const { connectToMongo } = require('../../src/db');
const { configApp } = require('../../src/app');

describe('endpoints', () => {
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

  // TODO: change description
  it('should return errors with message and statusCode', async () => {
    expect.assertions(4);

    const app = await configApp();
    const res = await supertest(app)
      .post('/api/users/-1')
      .set('Accept', 'application/json');

    const responseBody = res.body;

    expect(responseBody.message).toBeTruthy();
    expect(responseBody.statusCode).toBeTruthy();
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(res.status).toBe(400);
  });
});
