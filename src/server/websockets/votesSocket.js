const {ADD_VOTE, REMOVE_VOTE} = require('../constants/websocketConstants.js');
const {putVote, deleteVote} = require('../services/votesService.js');

const handleVote = (websocketConnection, server) => {
  websocketConnection.on('message', async (message) => {
    const {type, userId, commentId} = JSON.parse(message);
    const isAdd = type === ADD_VOTE;
    isAdd ?
      await putVote(userId, commentId) :
      await deleteVote(userId, commentId);
    server.broadcast(JSON.stringify({
      action: isAdd ? ADD_VOTE : REMOVE_VOTE,
      commentId,
    }));
  });
};

module.exports = {
  handleVote,
};
