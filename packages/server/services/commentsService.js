import commentDAO from '../dao/commentDAO.js';
import userDAO from '../dao/userDAO.js';
import voteDAO from '../dao/voteDAO.js';
import {getElapsedTime} from '../util/timeHelpers.js';

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
    const {comment_id, user_id, comment_text, created_timestamp} = comment;
    return {
      commentId: comment_id,
      commentText: comment_text,
      elapsedTime: getElapsedTime(created_timestamp),
      voteCount: voteMap[comment_id] || 0,
      user: userMap[user_id] || {name: 'Anonymous'},
    };
  });
  return mappedComments;
};

const postComment = async (body) => {
  await commentDAO.postComment(body);
};

export default {
  getComments,
  postComment,
};
