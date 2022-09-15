const voteDAO = require('../dao/voteDAO.js');

const mapDBVoteToJSVote = (vote) => ({
  voteId: vote.vote_id,
  userId: vote.user_id,
  commentId: vote.comment_id,
});

const getVotes = async () => {
  const votes = await voteDAO.getVotes();
  return votes.map(mapDBVoteToJSVote);
};

const deleteVote = async (userId, commentId) => {
  await voteDAO.deleteVote(userId, commentId);
};

const putVote = async (userId, commentId) => {
  await voteDAO.putVote(userId, commentId);
};

module.exports = {
  getVotes,
  deleteVote,
  putVote,
};
