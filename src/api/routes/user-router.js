import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  getCatsByUserId,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postUser);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(deleteUser);

userRouter.route('/catsownedbyuser/:id').get(getCatsByUserId);

export default userRouter;
