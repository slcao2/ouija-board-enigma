import userDAO from '../dao/userDAO.js';

const getUsers = async () => {
  return await userDAO.getUsers();
};

const getUser = async (id) => {
  return await userDAO.getUser(id);
};

const createUser = async (body) => {
  await userDAO.createUser(body);
};

export default {
  getUsers,
  getUser,
  createUser,
};
