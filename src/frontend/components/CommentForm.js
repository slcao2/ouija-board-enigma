import {postComment} from '../api/comments.js';
import {buildIcon} from './Icon.js';
import {clearCommentsSection, buildCommentsSection} from './CommentsSection.js';
import {getLocalStorageUser} from '../util/storageManager.js';

const commentFormOnSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const parentCommentId = parseInt(form.dataset.parentCommentId) || null;
  const input = form.getElementsByClassName('comment-input')[0];
  const commentText = input.value;
  const userId = getLocalStorageUser()?.userId;
  if (!userId) {
    console.error('No user found.');
  }
  postComment({userId, commentText, parentCommentId})
      .then(() => {
        clearCommentsSection();
        buildCommentsSection();
      })
      .catch((error) => {
        console.error(`Failed to post comment. ${error}`);
      });
  input.value = '';
};

export const buildCommentForm = (parentCommentId) => {
  const user = getLocalStorageUser();
  const icon = buildIcon(user?.picture);

  const textInput = document.createElement('input');
  textInput.classList.add('comment-input');
  textInput.type = 'text';
  textInput.placeholder = 'What are your thoughts?';

  const buttonInput = document.createElement('input');
  buttonInput.classList.add('comment-button');
  buttonInput.type = 'submit';
  buttonInput.value = 'Comment';

  const form = document.createElement('form');
  form.classList.add('comment-form');
  form.dataset.parentCommentId = parentCommentId;
  form.onsubmit = commentFormOnSubmit;
  form.append(icon, textInput, buttonInput);
  return form;
};
