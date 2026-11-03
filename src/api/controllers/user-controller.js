import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUsers = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'User item added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  const result = modifyUser(Number(req.params.id), req.body);
  if (result) {
    res.json({message: 'User item updated!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

const deleteUser = (req, res) => {
  const result = removeUser(Number(req.params.id));
  if (result) {
    res.json({message: 'User item deleted.'});
  } else {
    res.status(404).json({error: 404, message: 'User not found.'});
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
