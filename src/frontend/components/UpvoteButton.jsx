import {useState} from 'react';
import PropTypes from 'prop-types';

import {getLocalStorageUser} from '../util/storageManager.js';
import {sendVote} from '../websockets/votesSocket.js';

const setVoteCountList = [];

const UpvoteButton = ({
  commentId, voteCount, votedInitial,
}) => {
  const [voted, setVoted] = useState(votedInitial);
  const [liveVoteCount, setLiveVoteCount] = useState(voteCount);

  const COMMENT_ID_PREFIX = 'comment-id-';
  const ADDED_VOTE_CLASS = 'added-vote';

  setVoteCountList[commentId] = (isAdd) => {
    const increment = isAdd ? 1 : -1;
    setLiveVoteCount((liveVoteCount) => liveVoteCount + increment);
  };

  const getCommentIdFromClass = (className) => {
    const commentIdClass = className.split(' ').find((name) => {
      return name.startsWith(COMMENT_ID_PREFIX);
    });
    return commentIdClass && commentIdClass.substring(COMMENT_ID_PREFIX.length);
  };

  const buildVoteClasses = () => {
    return ['comment-action-button']
        .concat(
            voted ? ADDED_VOTE_CLASS : '',
            `${COMMENT_ID_PREFIX}${commentId}`,
        )
        .join(' ');
  };

  const buildVoteText = (count) => {
    return `\u25B2 Upvote (${count})`;
  };

  const voteOnClick = (event) => {
    event.preventDefault();
    const button = event.target;
    const commentId = getCommentIdFromClass(button.className);
    if (!commentId) {
      console.error('No commentId attached to voteButton.');
    }
    const user = getLocalStorageUser();

    if (voted) {
      sendVote(user.userId, commentId, false);
      setVoted(false);
    } else {
      sendVote(user.userId, commentId, true);
      setVoted(true);
    }
  };

  return (
    <button
      className={buildVoteClasses()}
      onClick={voteOnClick}
    >
      {buildVoteText(liveVoteCount)}
    </button>
  );
};

UpvoteButton.propTypes = {
  commentId: PropTypes.string.isRequired,
  voteCount: PropTypes.number.isRequired,
  votedInitial: PropTypes.bool.isRequired,
};

export {setVoteCountList};
export default UpvoteButton;
