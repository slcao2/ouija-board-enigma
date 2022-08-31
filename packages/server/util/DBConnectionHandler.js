import mysql from 'mysql2';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '172.26.0.1',
  user: 'slcao2',
  password: 'password',
  database: 'ouija',
  namedPlaceholders: true,
}).promise();

export default {
  pool,
};
