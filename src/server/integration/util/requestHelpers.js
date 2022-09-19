const request = require('supertest');
const app = require('../../app');
const {
  usersBaseUrl, commentsBaseUrl, votesBaseUrl,
} = require('../../constants/routeConstants');

const multiplePostUser = async (times, templateBody) => {
  const returnValue = [];
  for (const count of Array(times).keys()) {
    const body = {
      name: `${templateBody.name}${count}`,
      picture: `${templateBody.picture}${count}`,
    };
    const response = await postUser(body);
    returnValue.push({body, response});
  }
  return returnValue;
};

const postUser = async (body) => {
  return await request(app.app)
      .post(usersBaseUrl)
      .send(body);
};

const postComment = async (body) => {
  return await request(app.app)
      .post(commentsBaseUrl)
      .send(body);
};

const putVote = (userId, commentId) => {
  return request(app.app)
      .put(`${votesBaseUrl}/users/${userId}/comments/${commentId}`)
      .send();
};

const getVote = () => {
  return request(app.app)
      .get(votesBaseUrl);
};

module.exports = {
  postUser,
  postComment,
  multiplePostUser,
  putVote,
  getVote,
};
