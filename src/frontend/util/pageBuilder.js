import {getDefaultImage, isValidImage, getImage} from './imageHelpers.js';
import {getComments, postComment} from '../api/comments.js';
import pictures from '../assets/pictures/index.js';
import {deleteVote, getVotes, putVote} from '../api/votes.js';
import {getLocalStorageUser} from '../util/storageManager.js';

const COMMENT_ID_PREFIX = 'comment-id-';
const ADDED_VOTE_CLASS = 'added-vote';

const buildIcon = (picture) => {
  const icon = new Image();
  icon.src = isValidImage(picture) ? pictures[picture] : getDefaultImage();
  icon.alt = picture;
  icon.classList.add('comment-icon');
  return icon;
};

const buildCommentMeta = (name, elapsedTime) => {
  const metaContainer = document.createElement('div');
  metaContainer.classList.add('meta-container');

  const username = document.createElement('span');
  username.innerText = name;
  username.classList.add('username');

  const dot = document.createElement('span');
  dot.innerHTML = '&#183;';
  dot.classList.add('dot');

  const timestamp = document.createElement('span');
  timestamp.innerText = elapsedTime;
  timestamp.classList.add('timestamp');

  metaContainer.append(
      username, dot, timestamp,
  );
  return metaContainer;
};

const parseVoteTextForCount = (text) => {
  try {
    const countText = text.split('(')[1].split(')')[0];
    return parseInt(countText);
  } catch (error) {
    console.error('Failed to parse vote text for count.');
    return null;
  }
};

const buildVoteText = (count) => {
  return `&#x25B2; Upvote (${count})`;
};

const updateVoteTextOnButton = (button, addAmount) => {
  const count = parseVoteTextForCount(button.innerHTML);
  if (count !== null) {
    button.innerHTML = buildVoteText(count + addAmount);
  }
};

const voteOnclick = (event) => {
  event.preventDefault();
  const button = event.target;
  const voted = button.className.split(' ').find((name) => {
    return name === ADDED_VOTE_CLASS;
  });
  const commentIdClass = button.className.split(' ').find((name) => {
    return name.startsWith(COMMENT_ID_PREFIX);
  });
  const commentId = commentIdClass &&
    commentIdClass.substring(COMMENT_ID_PREFIX.length);
  if (!commentId) {
    console.error('No commentId attached to voteButton.');
  }
  const user = getLocalStorageUser();
  if (voted) {
    deleteVote(user.userId, commentId)
        .then(() => {
          button.classList.remove(ADDED_VOTE_CLASS);
          updateVoteTextOnButton(button, -1);
        });
  } else {
    putVote(user.userId, commentId)
        .then(() => {
          button.classList.add(ADDED_VOTE_CLASS);
          updateVoteTextOnButton(button, 1);
        });
  }
};

const replyOnclick = (event) => {
  event.preventDefault();
  // No actions here since reply button doesn't do much in V1
};

const buildCommentButtonContainer = (voteCount, commentId, isVoted) => {
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('comment-button-box');

  const upvoteButton = document.createElement('button');
  upvoteButton.innerHTML = buildVoteText(voteCount);
  upvoteButton.classList.add('comment-action-button');
  upvoteButton.classList.add(`${COMMENT_ID_PREFIX}${commentId}`);
  if (isVoted) {
    upvoteButton.classList.add(ADDED_VOTE_CLASS);
  }
  upvoteButton.onclick = voteOnclick;

  const replyButton = document.createElement('button');
  replyButton.textContent = 'Reply';
  replyButton.classList.add('comment-action-button');
  replyButton.onclick = replyOnclick;

  buttonContainer.append(
      upvoteButton, replyButton,
  );
  return buttonContainer;
};

const buildCommentHtml = (comment, isVoted) => {
  const {commentId, commentText, user, voteCount, elapsedTime} = comment;
  const {name, picture} = user;

  const commentContainer = document.createElement('div');
  commentContainer.classList.add('comment-container');

  const commentMain = document.createElement('div');
  commentMain.classList.add('comment-main-container');

  const icon = buildIcon(picture);
  const commentMeta = buildCommentMeta(name, elapsedTime);
  const commentTextNode = new Text(commentText);
  const buttonContainer = buildCommentButtonContainer(
      voteCount, commentId, isVoted,
  );

  commentMain.append(
      commentMeta, commentTextNode, buttonContainer,
  );
  commentContainer.append(
      icon, commentMain,
  );
  return commentContainer;
};

export const buildCommentsSection = () => {
  getComments()
      .then((comments) => {
        getVotes()
            .then((votes) => {
              const user = getLocalStorageUser();
              const userVotes = votes.filter(
                  (vote) => vote.userId === user.userId,
              );
              const commentsHtml = comments.map((comment) => {
                const isVoted = userVotes.filter(
                    (vote) => vote.commentId === comment.commentId,
                ).length > 0;
                return buildCommentHtml(comment, isVoted);
              });
              document.getElementById('comments').append(...commentsHtml);
            });
      });
};

const clearCommentsSection = () => {
  const commentsSection = document.getElementById('comments');
  while (commentsSection.firstChild) {
    commentsSection.removeChild(commentsSection.firstChild);
  }
};

export const updateCommenterIcon = (iconName) => {
  const icon = document.getElementById('commenter-icon');
  icon.src = getImage(iconName) || getDefaultImage();
  icon.alt = iconName;
};

export const addCommentFormEventListener = (userId) => {
  const listener = (event) => {
    event.preventDefault();
    const input = document.getElementById('comment-input');
    const commentText = input.value;
    postComment({userId, commentText})
        .then(() => {
          clearCommentsSection();
          buildCommentsSection();
        })
        .catch((error) => {
          console.error(`Failed to post comment. ${error}`);
        });
    input.value = '';
  };
  const form = document.getElementById('comment-form');
  form.addEventListener('submit', listener);
};
