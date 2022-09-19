import {buildCommentForm} from './CommentForm.js';

const replyOnClick = (event) => {
  event.preventDefault();

  const replyButton = event.target;
  const commentMainContainer = replyButton.closest('.comment-main-container');
  const commentForm = commentMainContainer
      .getElementsByClassName('comment-form');
  if (commentForm.length > 0) {
    commentForm[0].remove();
  } else {
    const form = buildCommentForm(replyButton.dataset.commentId);
    replyButton.closest('.comment-button-box')?.after(form);
  }
};

export const buildReplyButton = (commentId) => {
  const replyButton = document.createElement('button');
  replyButton.textContent = 'Reply';
  replyButton.classList.add('comment-action-button');
  replyButton.onclick = replyOnClick;
  replyButton.dataset.commentId = commentId;

  return replyButton;
};
