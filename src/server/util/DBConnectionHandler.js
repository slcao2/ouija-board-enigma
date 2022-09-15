const mysql = require('mysql2');

/*
Ideally will purge git history (or just not commit in the first place),
but leaving as is for time sake
*/
const createPool = () => {
  endPool();
  module.exports.pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    namedPlaceholders: true,
  }).promise();
};

const endPool = () => {
  if (module.exports.pool) {
    module.exports.pool.end();
  }
};

module.exports = {
  createPool,
  endPool,
};
