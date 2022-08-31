import DBConnectionHandler from '../util/DBConnectionHandler.js';

const tableName = 'user';

const getUsers = async () => {
  const [rows] = await DBConnectionHandler.pool.execute(
      `SELECT * FROM ${tableName}`,
  );
  console.debug(rows);
  return rows;
};

const getUser = async (userId) => {
  // eslint-disable-next-line no-unused-vars
  const [rows, fields] = await DBConnectionHandler.pool.execute(
      `SELECT * FROM ${tableName} WHERE user_id=${userId}`,
  );
  if (rows.length > 1) {
    console.error(
        'Multiple users with same id. Something in the DB is messed up.',
    );
  }
  console.debug(rows);
  return rows.pop();
};

const createUser = async (user) => {
  const [rows] = await DBConnectionHandler.pool.execute(
      `INSERT INTO ${tableName} SET name=:name, picture=:picture`,
      user,
  );
  console.debug(rows);
  return rows;
};

export default {
  getUsers,
  getUser,
  createUser,
};
