import voteDAO from '../dao/voteDAO.js';

const getVotes = async () => {
  return await voteDAO.getVotes();
};

const deleteVote = async (userId, commentId) => {
  await voteDAO.deleteVote(userId, commentId);
};

const putVote = async (userId, commentId) => {
  await voteDAO.putVote(userId, commentId);
};

export default {
  getVotes,
  deleteVote,
  putVote,
};
