import {getComments} from '../api/comments.js';
import {getVotes} from '../api/votes.js';
import {buildCommentSection} from './CommentSection.js';
import {getLocalStorageUser} from '../util/storageManager.js';

const findUserVotes = (votes, userId) => {
  return votes.filter(
      (vote) => vote.userId === userId,
  );
};

const isCommentVoted = (userVotes, commentId) => {
  return !!userVotes.filter(
      (vote) => vote.commentId === commentId,
  ).length > 0;
};

const appendCommentsToParent = (commentNodes) => {
  Object.values(commentNodes).forEach((node) => {
    const parentCommentId = parseInt(node.dataset.parentCommentId) || null;
    if (parentCommentId) {
      const commentMainContainer = commentNodes[parentCommentId]
          ?.getElementsByClassName('comment-main-container')[0];
      commentMainContainer?.append(node);
    }
  });
};

const hideVerticalLineOnChildlessComments = (commentNodes) => {
  Object.values(commentNodes).forEach((node) => {
    const hasChildComment = !!(node
        .getElementsByClassName('comment-container').length > 0);
    if (!hasChildComment) {
      const verticalLine = node.getElementsByClassName('icon-vertical-line')[0];
      verticalLine.classList.add('no-display');
    }
  });
};

export const buildCommentsSection = () => {
  getComments()
      .then((comments) => {
        getVotes()
            .then((votes) => {
              const user = getLocalStorageUser();
              const userVotes = findUserVotes(votes, user.userId);

              const topLevelComments = [];
              const commentNodes = comments.reduce((commentMap, comment) => {
                const isVoted = isCommentVoted(userVotes, comment.commentId);
                const commentHtml = buildCommentSection(comment, isVoted);
                if (!comment.parentCommentId) {
                  topLevelComments.push(commentHtml);
                }
                commentMap[comment.commentId] = commentHtml;
                return commentMap;
              }, {});
              appendCommentsToParent(commentNodes);
              hideVerticalLineOnChildlessComments(commentNodes);
              document.getElementById('comments').append(...topLevelComments);
            });
      });
};

export const clearCommentsSection = () => {
  const commentsSection = document.getElementById('comments');
  while (commentsSection.firstChild) {
    commentsSection.removeChild(commentsSection.firstChild);
  }
};
