const commentDAO = require('../dao/commentDAO.js');
const userDAO = require('../dao/userDAO.js');
const voteDAO = require('../dao/voteDAO.js');
const timeHelpers = require('../util/timeHelpers.js');

const buildVoteMap = (votes) => {
  const map = {};
  votes.forEach(({comment_id}) => {
    map[comment_id] = (map[comment_id] || 0) + 1;
  });
  return map;
};

const buildUserMap = (users) => {
  const map = {};
  users.forEach(({user_id, name, picture}) => {
    map[user_id] = {name, picture};
  });
  return map;
};

const getComments = async () => {
  const [comments, users, votes] = await Promise.all([
    commentDAO.getComments(),
    userDAO.getUsers(),
    voteDAO.getVotes(),
  ]);

  const voteMap = buildVoteMap(votes);
  const userMap = buildUserMap(users);
  const mappedComments = comments.map((comment) => {
    const {
      comment_id, user_id, comment_text, created_timestamp, parent_comment_id,
    } = comment;
    return {
      commentId: comment_id,
      commentText: comment_text,
      elapsedTime: timeHelpers.getElapsedTime(created_timestamp),
      voteCount: voteMap[comment_id] || 0,
      user: userMap[user_id] || {name: 'Anonymous'},
      parentCommentId: parent_comment_id,
    };
  });
  return mappedComments;
};

const postComment = async (body) => {
  await commentDAO.postComment(body);
};

module.exports = {
  getComments,
  postComment,
};
