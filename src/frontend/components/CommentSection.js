import {buildCommentMeta} from './CommentMeta.js';
import {buildIcon} from './Icon.js';
import {
  buildCommentButtonContainer,
} from './CommentButtonSection.js';

export const buildCommentSection = (comment, isVoted) => {
  const {
    commentId, commentText, user, voteCount, elapsedTime, parentCommentId,
  } = comment;
  const {name, picture} = user;

  const icon = buildIcon(picture);
  const verticalLine = document.createElement('div');
  verticalLine.classList.add('icon-vertical-line');
  const commentMeta = buildCommentMeta(name, elapsedTime);
  const commentTextNode = new Text(commentText);
  const buttonContainer = buildCommentButtonContainer(
      voteCount, commentId, isVoted,
  );

  const iconContainer = document.createElement('div');
  iconContainer.classList.add('icon-container');
  iconContainer.append(
      icon, verticalLine,
  );

  const commentMain = document.createElement('div');
  commentMain.classList.add('comment-main-container');
  commentMain.append(
      commentMeta, commentTextNode, buttonContainer,
  );

  const commentContainer = document.createElement('div');
  commentContainer.classList.add('comment-container');
  commentContainer.dataset.parentCommentId = parentCommentId;
  commentContainer.append(
      iconContainer, commentMain,
  );

  return commentContainer;
};
