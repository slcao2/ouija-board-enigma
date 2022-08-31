import mysql from 'mysql2';

/*
In a production environment, ideally you would want to hide these behind
some sort of secret manager like Hashicorp Vault https://www.vaultproject.io/
*/
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
