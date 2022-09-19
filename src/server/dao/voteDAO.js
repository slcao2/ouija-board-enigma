const DBConnectionHandler = require('../util/DBConnectionHandler.js');

const tableName = 'vote';

const getVotes = async () => {
  const [rows] = await DBConnectionHandler.pool.execute(
      `SELECT * FROM ${tableName}`,
  );
  console.debug(rows);
  return rows;
};

const deleteVote = async (userId, commentId) => {
  const [rows] = await DBConnectionHandler.pool.execute(
      `
      DELETE FROM ${tableName} 
      WHERE user_id=${userId} AND comment_id=${commentId}
      `,
  );
  console.debug(rows);
  return rows;
};


const putVote = async (userId, commentId) => {
  const [rows] = await DBConnectionHandler.pool.execute(
      `INSERT INTO ${tableName} SET user_id=:userId, comment_id=:commentId`,
      {userId, commentId},
  );
  console.debug(rows);
  return rows;
};

module.exports = {
  getVotes,
  deleteVote,
  putVote,
};
