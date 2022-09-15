const mysql = require('mysql2');

/*
Ideally will purge git history (or just not commit in the first place),
but leaving as is for time sake
*/
const createPool = () => {
  endPool();
  module.exports.pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST, // '172.29.32.1'
    user: process.env.DB_USER, // 'slcao2'
    password: process.env.DB_PASSWORD, // 'password'
    database: process.env.DB_DATABASE, // 'ouija'
    port: process.env.DB_PORT, // 3306
    namedPlaceholders: true,
  }).promise();
};

const endPool = () => {
  if (module.exports.pool) {
    module.exports.pool.end();
  }
};

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: '172.29.32.1', // '172.29.32.1'
//   user: 'slcao2', // 'slcao2'
//   password: 'password', // 'password'
//   database: 'ouija', // 'ouija'
//   port: 3306, // 3306
//   namedPlaceholders: true,
// }).promise();

module.exports = {
  createPool,
  endPool,
};
