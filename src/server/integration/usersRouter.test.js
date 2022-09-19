const request = require('supertest');
const assert = require('assert');
const app = require('../app');
const {beforeSetup, afterSetup} = require('./util/DBContainerHelper');
const {createPool} = require('../util/DBConnectionHandler');
const {usersBaseUrl} = require('../constants/routeConstants');
const {postUser, multiplePostUser} = require('./util/requestHelpers');
const {postUserBody} = require('./util/dataFixtures');

describe('usersRouter', () => {
  let oldEnv;
  let container;

  beforeEach(async () => {
    const setup = await beforeSetup();
    oldEnv = setup.oldEnv;
    container = setup.container;
    createPool();
  });

  afterEach(() => {
    afterSetup(oldEnv, container);
  });

  describe('GET /users', () => {
    it('should get all users', async () => {
      const requestResponses = await multiplePostUser(3, postUserBody);
      requestResponses.forEach(({body, response}, index) => {
        assert.equal(response.status, 200);
        assert.deepStrictEqual(
            response.body, {...body, userId: index+1},
        );
      });
      const response = await request(app.app).get(usersBaseUrl);
      assert.equal(response.status, 200);
      assert.equal(response.body.length, 3);
      assert.deepStrictEqual(
          response.body,
          requestResponses.map((r, i) => ({...r.body, userId: i+1})),
      );
    });
    it('should return an empty array if no users saved', async () => {
      const response = await request(app.app).get(usersBaseUrl);
      assert.equal(response.status, 200);
      assert.equal(response.body.length, 0);
    });
  });

  describe('GET /users', () => {
    it('should get a specific users if it exists', async () => {
      const requestResponses = await multiplePostUser(3, postUserBody);
      requestResponses.forEach(({body, response}, index) => {
        assert.equal(response.status, 200);
        assert.deepStrictEqual(
            response.body, {...body, userId: index+1},
        );
      });
      const response = await request(app.app).get(`${usersBaseUrl}/2`);
      assert.equal(response.status, 200);
      assert.deepStrictEqual(
          response.body, {name: 'test1', picture: 'panda1', userId: 2},
      );
    });
    it('should return 404 if user does not exist', async () => {
      const save = await postUser(postUserBody);
      assert.equal(save.status, 200);
      assert.deepStrictEqual(save.body, {...postUserBody, userId: 1});

      const response = await request(app.app).get(`${usersBaseUrl}/2`);
      assert.equal(response.status, 404);
    });
  });

  describe('POST /users', () => {
    it('should save a valid user to the db and return it', async () => {
      const requestResponses = await multiplePostUser(10, postUserBody);
      requestResponses.forEach(({body, response}, index) => {
        assert.equal(response.status, 200);
        assert.deepStrictEqual(
            response.body, {...body, userId: index+1},
        );
      });
    });
    it('should return 400 if the body has no name', async () => {
      const response = await postUser({
        picture: 'panda',
      });
      assert.equal(response.status, 400);
    });
    it('should return 200 even with no picture', async () => {
      const body = {
        name: 'test',
      };
      const response = await postUser(body);
      assert.equal(response.status, 200);
      assert.deepStrictEqual(
          response.body, {...body, userId: 1, picture: null},
      );
    });
  });
});
