import votesService from '../services/votesService.js';

const getVotes = async (req, res) => {
  res.json(await votesService.getVotes());
};

const deleteVote = async (req, res) => {
  const {userId, commentId} = req.params;
  await votesService.deleteVote(userId, commentId);
  res.sendStatus(204);
};

const putVote = async (req, res) => {
  const {userId, commentId} = req.params;
  await votesService.putVote(userId, commentId);
  res.sendStatus(204);
};

export default {
  getVotes,
  deleteVote,
  putVote,
};
