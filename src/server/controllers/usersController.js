const {validationResult} = require('express-validator');
const usersService = require('../services/usersService.js');

const getUsers = async (req, res) => {
  res.json(await usersService.getUsers());
};

const getUser = async (req, res) => {
  const {id} = req.params;
  const user = await usersService.getUser(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send(`User ${id} does not exist.`);
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const reqBody = req.body;
  console.debug(reqBody);
  const createdUser = await usersService.createUser(reqBody);
  res.json(createdUser);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
