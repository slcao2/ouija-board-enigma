import {
  ADD_VOTE, REMOVE_VOTE,
} from '../../server/constants/websocketConstants.js';
import {websocket} from '../util/websocketClient.js';

export const sendVote = (userId, commentId, isAdd) => {
  websocket?.send(JSON.stringify({
    type: isAdd ? ADD_VOTE : REMOVE_VOTE,
    userId,
    commentId,
  }));
};
