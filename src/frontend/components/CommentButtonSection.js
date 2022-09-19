import ReactDOM from 'react-dom';
import {buildReplyButton} from './ReplyButton.js';
import UpvoteButton from './UpvoteButton.jsx';

export const buildCommentButtonContainer = (voteCount, commentId, isVoted) => {
  const upvoteButton = document.createElement('div');
  ReactDOM.createRoot(upvoteButton).render(
      <UpvoteButton
        commentId={commentId}
        voteCount={voteCount}
        votedInitial={isVoted}
      />,
  );

  const replyButton = buildReplyButton(commentId);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('comment-button-box');
  buttonContainer.append(
      upvoteButton, replyButton,
  );
  return buttonContainer;
};
