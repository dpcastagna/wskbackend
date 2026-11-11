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
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    validationErrors,
    postUser
  );

userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

userRouter.route('/catsownedbyuser/:id').get(getCatsByUserId);

export default userRouter;
