const assert = require('assert');
const sinon = require('sinon');
const testFixtures = require('../util/testFixtures');
const votesService = require('./votesService');
const voteDAO = require('../dao/voteDAO');

describe('votesService', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('getVotes', () => {
    beforeEach(() => {
      sinon.replace(voteDAO, 'getVotes', sinon.fake.returns(
          [testFixtures.voteFixture()],
      ));
    });

    it('should get all votes', async () => {
      const actual = await votesService.getVotes();
      const expected = [{
        voteId: 1,
        userId: 1,
        commentId: 1,
      }];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('deleteVote', () => {
    beforeEach(() => {
      sinon.replace(voteDAO, 'deleteVote', sinon.fake.returns({}));
    });

    it('should delete a vote', async () => {
      const userId = 1;
      const commentId = 1;
      await votesService.deleteVote(userId, commentId);
      assert.equal(voteDAO.deleteVote.callCount, 1);
      assert.deepStrictEqual(voteDAO.deleteVote.args[0], [userId, commentId]);
    });
  });
  describe('putVote', () => {
    beforeEach(() => {
      sinon.replace(voteDAO, 'putVote', sinon.fake.returns({}));
    });

    it('should post a vote', async () => {
      const userId = 1;
      const commentId = 1;
      await votesService.putVote(userId, commentId);
      assert.equal(voteDAO.putVote.callCount, 1);
      assert.deepStrictEqual(voteDAO.putVote.args[0], [userId, commentId]);
    });
  });
});
