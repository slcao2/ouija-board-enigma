const DBConnectionHandler = require('../util/DBConnectionHandler.js');

const tableName = 'comment';

const getComments = async () => {
  const [rows] = await DBConnectionHandler.pool.execute(
      `SELECT * FROM ${tableName} ORDER BY created_timestamp DESC`,
  );
  console.debug(rows);
  return rows;
};

const postComment = async (comment) => {
  const parentCommentIdSet = ', parent_comment_id=:parentCommentId';
  const insertStatement =
    `INSERT INTO ${tableName} SET user_id=:userId, comment_text=:commentText` +
    (comment.parentCommentId ? parentCommentIdSet : '');
  const [rows] = await DBConnectionHandler.pool.execute(
      insertStatement,
      comment,
  );
  console.debug(rows);
  return rows;
};

module.exports = {
  getComments,
  postComment,
};
