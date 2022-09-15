const assert = require('assert');
const sinon = require('sinon');
const testFixtures = require('../util/testFixtures');
const commentsService = require('./commentsService');
const commentDAO = require('../dao/commentDAO');
const userDAO = require('../dao/userDAO');
const voteDAO = require('../dao/voteDAO');
const timeHelpers = require('../util/timeHelpers');

describe('commentsService', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('getComments', () => {
    beforeEach(() => {
      sinon.replace(commentDAO, 'getComments', sinon.fake.returns(
          [testFixtures.commentFixture()],
      ));
      sinon.replace(timeHelpers, 'getElapsedTime', sinon.fake.returns(
          'A few seconds ago',
      ));
    });

    it('should get all the comments', async () => {
      sinon.replace(voteDAO, 'getVotes', sinon.fake.returns(
          [testFixtures.voteFixture()],
      ));
      sinon.replace(userDAO, 'getUsers', sinon.fake.returns(
          [testFixtures.userFixture()],
      ));
      const actual = await commentsService.getComments();
      const expected = [{
        commentId: 1,
        commentText: 'test',
        elapsedTime: 'A few seconds ago',
        voteCount: 1,
        user: {
          name: 'test',
          picture: 'panda',
        },
      }];
      assert.deepStrictEqual(actual, expected);
    });

    it('should set vote count to 0 if no votes given', async () => {
      sinon.replace(userDAO, 'getUsers', sinon.fake.returns(
          [testFixtures.userFixture()],
      ));
      sinon.replace(voteDAO, 'getVotes', sinon.fake.returns(
          [],
      ));
      const actual = await commentsService.getComments();
      const expected = [{
        commentId: 1,
        commentText: 'test',
        elapsedTime: 'A few seconds ago',
        voteCount: 0,
        user: {
          name: 'test',
          picture: 'panda',
        },
      }];
      assert.deepStrictEqual(actual, expected);
    });

    it('should use anonymous user if user not found', async () => {
      sinon.replace(userDAO, 'getUsers', sinon.fake.returns(
          [],
      ));
      sinon.replace(voteDAO, 'getVotes', sinon.fake.returns(
          [testFixtures.voteFixture()],
      ));
      const actual = await commentsService.getComments();
      const expected = [{
        commentId: 1,
        commentText: 'test',
        elapsedTime: 'A few seconds ago',
        voteCount: 1,
        user: {
          name: 'Anonymous',
        },
      }];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('postComment', () => {
    beforeEach(() => {
      sinon.replace(commentDAO, 'postComment', sinon.fake.returns({}));
    });

    it('should call commentDAO and post a comment', async () => {
      const mockBody = {};
      await commentsService.postComment(mockBody);
      assert.equal(commentDAO.postComment.callCount, 1);
      assert.equal(commentDAO.postComment.firstArg, mockBody);
    });
  });
});
