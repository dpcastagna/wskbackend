import {
  addUser,
  findCatsByUserId,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(req.params.id);
  if (cats) {
    for (const cat of cats) {
      const owner = await findUserById(cat.owner);
      cat.ownername = owner.name;
    }
    res.json(cats);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'User item added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  console.log('putUser', req.body);

  const id = Number(req.params.id);
  const user = res.locals.user;
  const modifiedUser = req.body;
  const result = await modifyUser(id, user, modifiedUser);
  if (result) {
    res.json({message: 'User item updated!'});
  } else {
    res.status(404).json({error: 404, message: 'User not found.'});
  }
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = res.locals.user;
  const result = await removeUser(id, user);
  console.log('deleteUser', result);
  if (result) {
    res.json({message: 'User item deleted.'});
  } else {
    res.status(404).json({error: 404, message: 'User not found.'});
  }
};

export {getUsers, getUserById, getCatsByUserId, postUser, putUser, deleteUser};
