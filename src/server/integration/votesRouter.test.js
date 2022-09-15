const request = require('supertest');
const assert = require('assert');
const app = require('../app');
const {beforeSetup, afterSetup} = require('./util/DBContainerHelper');
const {createPool} = require('../util/DBConnectionHandler');
const {votesBaseUrl} = require('../util/routeConstants');
const {
  postUser, postComment, putVote, getVote,
} = require('./util/requestHelpers');
const {postUserBody, postCommentBody} = require('./util/dataFixtures');

describe('votesRouter', () => {
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

  describe('GET /votes', () => {
    it('should get all votes', async () => {
      await postUser(postUserBody);
      await postComment(postCommentBody);
      await putVote(1, 1);
      const response = await getVote();
      assert.equal(response.status, 200);
      assert.deepStrictEqual(
          response.body, [{voteId: 1, userId: 1, commentId: 1}],
      );
    });
    it('should return an empty array if no votes saved', async () => {
      await postUser(postUserBody);
      await postComment(postCommentBody);
      const response = await getVote();
      assert.equal(response.status, 200);
      assert.deepStrictEqual(
          response.body, [],
      );
    });
  });

  describe('DELETE /votes/users/:userId/comments/:commentId', () => {
    it('should delete a vote', async () => {
      await postUser(postUserBody);
      await postComment(postCommentBody);
      await putVote(1, 1);
      const firstGetResponse = await getVote();
      assert.equal(firstGetResponse.status, 200);
      assert.equal(firstGetResponse.body.length, 1);

      const deleteResponse = await request(app.app)
          .delete(`${votesBaseUrl}/users/1/comments/1`);
      assert.equal(deleteResponse.status, 204);

      const secondGetResponse = await getVote();
      assert.equal(secondGetResponse.body.length, 0);
      assert.deepStrictEqual(
          secondGetResponse.body, [],
      );
    });
    it('should do nothing if vote does not exist', async () => {
      await postUser(postUserBody);
      await postComment(postCommentBody);
      const deleteResponse = await request(app.app)
          .delete(`${votesBaseUrl}/users/1/comments/1`);
      assert.equal(deleteResponse.status, 204);
    });
  });

  describe('PUT /votes/users/:userId/comments/:commentId', () => {
    it('should save a vote', async () => {
      await postUser(postUserBody);
      await postComment(postCommentBody);
      const response = await putVote(1, 1);
      assert.equal(response.status, 204);
    });
    it('should return 404 if no userId', async () => {
      await postUser(postUserBody);
      await postComment(postCommentBody);
      const response = await putVote(2, 1);
      assert.equal(response.status, 422);
    });
    it('should return 404 if no commentId', async () => {
      await postUser(postUserBody);
      await postComment(postCommentBody);
      const response = await putVote(1, 2);
      assert.equal(response.status, 422);
    });
  });
});
