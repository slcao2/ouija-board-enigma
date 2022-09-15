const request = require('supertest');
const assert = require('assert');
const app = require('../app');
const {beforeSetup, afterSetup} = require('./util/DBContainerHelper');
const {createPool} = require('../util/DBConnectionHandler');
const {commentsBaseUrl} = require('../util/routeConstants');
const {postUser, postComment} = require('./util/requestHelpers');
const {postUserBody, postCommentBody} = require('./util/dataFixtures');

describe('commentsRouter', () => {
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

  describe('GET /comments', () => {
    it('should get all comments', async () => {
      await postUser(postUserBody);
      await postComment(postCommentBody);
      const response = await request(app.app).get(commentsBaseUrl);

      assert.equal(response.status, 200);
      assert.equal(response.body.length, 1);

      const {commentId, commentText, voteCount, user} = response.body[0];
      assert.equal(commentId, 1);
      assert.equal(commentText, 'mockCommentText');
      assert.equal(voteCount, 0);
      assert.deepStrictEqual(user, postUserBody);
    });
    it('should return an empty array if no comments saved', async () => {
      const response = await request(app.app).get(commentsBaseUrl);
      assert.equal(response.status, 200);
      assert.equal(response.body.length, 0);
    });
  });

  describe('POST /comments', () => {
    it('should save a valid comment to the db', async () => {
      await postUser(postUserBody);
      const response = await postComment(postCommentBody);
      assert.equal(response.status, 201);
    });
    it('should return 500 if no user exists matching userId', async () => {
      const response = await postComment(postCommentBody);
      assert.equal(response.status, 422);
    });
    it('should return 400 if userId is missing', async () => {
      const commentBody = {
        commentText: 'mockCommentText',
      };
      const response = await postComment(commentBody);
      assert.equal(response.status, 400);
    });
    it('should return 400 if commentText is missing', async () => {
      const commentBody = {
        userId: 1,
      };
      const response = await postComment(commentBody);
      assert.equal(response.status, 400);
    });
  });
});
