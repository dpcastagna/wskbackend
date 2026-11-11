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

const getUserById = async (req, res, next) => {
  const result = await findUserById(req.params.id);
  if (!result) {
    return next(new Error('User not found.'));
  }
  res.json(result);
};

const getCatsByUserId = async (req, res, next) => {
  const result = await findCatsByUserId(req.params.id);
  // console.log(result);
  if (!result) {
    return next(new Error('User not found, so no cats were found also.'));
  }
  for (const cat of result) {
    const owner = await findUserById(cat.owner);
    cat.ownername = owner.name;
  }
  res.json(result);
};

const postUser = async (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201);
  res.json({message: 'User added.', result});
};

const putUser = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  console.log('putUser', req.body);

  const id = Number(req.params.id);
  const user = res.locals.user;
  const modifiedUser = req.body;
  const result = await modifyUser(id, user, modifiedUser);
  console.log(result);
  if (!result) {
    return next(new Error('User not found, so no user was updated.'));
  }
  res.json({message: 'User updated!'});
};

const deleteUser = async (req, res, next) => {
  const id = Number(req.params.id);
  const user = res.locals.user;
  const result = await removeUser(id, user);
  console.log('deleteUser', result);
  if (!result) {
    return next(new Error('User not found, so no user was deleted.'));
  }
  res.json({message: 'User deleted.'});
};

export {getUsers, getUserById, getCatsByUserId, postUser, putUser, deleteUser};
