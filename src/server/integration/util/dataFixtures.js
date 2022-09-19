const postUserBody = {
  name: 'test',
  picture: 'panda',
};

const postCommentBody = {
  userId: 1,
  commentText: 'mockCommentText',
};

const postCommentBodyWithParentId = {
  userId: 1,
  commentText: 'mockCommentText',
  parentCommentId: 1,
};

module.exports = {
  postUserBody,
  postCommentBody,
  postCommentBodyWithParentId,
};
