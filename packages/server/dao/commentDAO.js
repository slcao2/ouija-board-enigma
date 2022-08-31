import DBConnectionHandler from '../util/DBConnectionHandler.js';

const tableName = 'comment';

const getComment = async () => {
  const [rows] = await DBConnectionHandler.pool.execute(
      `SELECT * FROM ${tableName}`,
  );
  console.debug(rows);
  return rows;
};

const postComment = async (comment) => {
  const [rows] = await DBConnectionHandler.pool.execute(
      `INSERT INTO ${tableName} SET user_id=:userId, comment_text=:commentText`,
      comment,
  );
  console.debug(rows);
  return rows;
};

export default {
  getComment,
  postComment,
};
