
import {buildCommentForm} from '../components/CommentForm.js';
import {
  buildCommentsSection,
} from '../components/CommentsSection.js';

export const buildPage = () => {
  const mainCommentForm = document.getElementById('main-comment-form');
  mainCommentForm.append(buildCommentForm());

  buildCommentsSection();
};
