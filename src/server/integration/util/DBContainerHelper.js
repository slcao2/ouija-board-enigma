const {MySqlContainer} = require('testcontainers');
const DB_DATABASE = 'ouija';
const DB_PORT = 3306;

const getTestContainer = () => {
  return new MySqlContainer('mysql:8.0.30')
      .withDatabase(DB_DATABASE)
      .start();
};

const createTables = async (container) => {
  await container.executeQuery(`
    CREATE TABLE ${DB_DATABASE}.user (
      user_id INT NOT NULL AUTO_INCREMENT,
      name CHAR(255) NOT NULL,
      picture TEXT,
      PRIMARY KEY (user_id)
    );
    
    CREATE TABLE ${DB_DATABASE}.comment (
      comment_id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      comment_text TEXT NOT NULL,
      created_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      parent_comment_id INT,
      PRIMARY KEY (comment_id),
      FOREIGN KEY (user_id) REFERENCES user(user_id)
    );
    
    CREATE TABLE ${DB_DATABASE}.vote (
      vote_id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      comment_id INT NOT NULL,
      PRIMARY KEY (vote_id),
      FOREIGN KEY (user_id) REFERENCES user(user_id),
      FOREIGN KEY (comment_id) REFERENCES comment(comment_id)
    );
  `);
};

const buildContainer = async () => {
  const container = await getTestContainer();
  await createTables(container);
  return container;
};

const beforeSetup = async () => {
  const container = await buildContainer();
  const returnValue = {
    oldEnv: process.env,
    container,
  };
  process.env = {
    ...process.env,
    DB_HOST: container.getHost(),
    DB_USER: container.getUsername(),
    DB_PASSWORD: container.getUserPassword(),
    DB_DATABASE: container.getDatabase(),
    DB_PORT: container.getMappedPort(DB_PORT),
  };
  return returnValue;
};

const afterSetup = (oldEnv, container) => {
  process.env = oldEnv;
  container.stop();
};

module.exports = {
  beforeSetup,
  afterSetup,
};
