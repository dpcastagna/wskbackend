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

(userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('name').trim().notEmpty().withMessage('required'),
    body('email').trim().notEmpty().withMessage('required').isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('role')
      .trim()
      .notEmpty()
      .withMessage('required')
      .custom((value) => {
        if (value == 'admin' || value == 'user') {
          return true;
        }
      }),
    body('password').trim().isLength({min: 8})
  ),
  validationErrors,
  postUser);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(
    authenticateToken,
    body('name').trim().optional(),
    body('email').trim().optional().isEmail(),
    body('username')
      .trim()
      .optional()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('role')
      .trim()
      .optional()
      .custom((value) => {
        if (value == 'admin' || value == 'user') {
          return true;
        }
      }),
    body('password').trim().optional().isLength({min: 8}),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, deleteUser);

userRouter.route('/catsownedbyuser/:id').get(getCatsByUserId);

export default userRouter;
