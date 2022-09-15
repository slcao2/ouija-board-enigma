const commentFixture = (
    comment_id = 1,
    user_id = 1,
    comment_text = 'test',
    created_timestamp = '2022-09-08T06:12:08Z',
) => {
  return {
    comment_id,
    user_id,
    comment_text,
    created_timestamp,
  };
};

const userFixture = (
    user_id = 1,
    name = 'test',
    picture = 'panda',
) => {
  return {
    user_id,
    name,
    picture,
  };
};

const voteFixture = (
    vote_id = 1,
    user_id = 1,
    comment_id = 1,
) => {
  return {
    vote_id,
    user_id,
    comment_id,
  };
};

module.exports = {
  commentFixture,
  userFixture,
  voteFixture,
};
