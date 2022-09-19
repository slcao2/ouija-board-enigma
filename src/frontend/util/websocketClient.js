import {
  ADD_VOTE, REMOVE_VOTE,
} from '../../server/constants/websocketConstants.js';
import {setVoteCountList} from '../components/UpvoteButton.jsx';

export let websocket;

export const setupWebsocket = () => {
  websocket = new WebSocket('ws://localhost:3000/ws');
  websocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.action) {
      case ADD_VOTE:
        setVoteCountList[message.commentId](true);
        break;
      case REMOVE_VOTE:
        setVoteCountList[message.commentId](false);
        break;
      default:
        console.warn('invalid message type on websocket');
    }
  };
};
