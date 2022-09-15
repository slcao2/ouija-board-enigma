const assert = require('assert');
const sinon = require('sinon');
const testFixtures = require('../util/testFixtures');
const usersService = require('./usersService');
const userDAO = require('../dao/userDAO');

describe('usersService', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('getUsers', () => {
    beforeEach(() => {
      sinon.replace(userDAO, 'getUsers', sinon.fake.returns(
          [testFixtures.userFixture()],
      ));
    });

    it('should get all users', async () => {
      const actual = await usersService.getUsers();
      const expected = [{
        userId: 1,
        name: 'test',
        picture: 'panda',
      }];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('getUser', () => {
    it('should get a user by id', async () => {
      sinon.replace(userDAO, 'getUser', sinon.fake.returns(
          testFixtures.userFixture(),
      ));
      const actual = await usersService.getUser(1);
      const expected = {
        userId: 1,
        name: 'test',
        picture: 'panda',
      };
      assert.deepStrictEqual(actual, expected);
    });

    it('should return undefined if no user found', async () => {
      sinon.replace(userDAO, 'getUser', sinon.fake.returns(undefined));
      const actual = await usersService.getUser(1);
      assert.deepStrictEqual(actual, undefined);
    });
  });
  describe('createUser', () => {
    beforeEach(() => {
      sinon.replace(userDAO, 'createUser', sinon.fake.returns(
          {insertId: 1},
      ));
    });

    it('should create user', async () => {
      const body = {
        name: 'test',
        picture: 'panda',
      };
      const actual = await usersService.createUser(body);
      const expected = {
        userId: 1,
        ...body,
      };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
