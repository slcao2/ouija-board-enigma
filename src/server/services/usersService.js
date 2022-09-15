const userDAO = require('../dao/userDAO.js');

const mapDBUserToJSUser = (dbUser) => {
  const {user_id, name, picture} = dbUser;
  return {
    userId: user_id,
    name,
    picture,
  };
};

const getUsers = async () => {
  const users = await userDAO.getUsers();
  return users.map((user) => mapDBUserToJSUser(user));
};

const getUser = async (id) => {
  const user = await userDAO.getUser(id);
  return user ? mapDBUserToJSUser(user) : user;
};

const createUser = async (body) => {
  const {insertId} = await userDAO.createUser(body);
  return {
    userId: insertId,
    ...body,
  };
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
