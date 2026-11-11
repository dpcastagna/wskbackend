import express from 'express';
import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import logger from '../../middlewares/logger.js';

import {createThumbnail} from '../../middlewares/upload.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {upload} from '../../middlewares/upload.js';
import {body, param} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(logger, getCats)
  .post(
    authenticateToken,
    upload.single('image'),
    body('cat_name').trim().notEmpty().withMessage('required'),
    body('weight')
      .trim()
      .notEmpty()
      .withMessage('required')
      .isNumeric()
      .isFloat({max: 50})
      .withMessage('Weight cannot be higher than 50'),
    body('owner').trim().notEmpty().withMessage('required').isNumeric(),
    body('birthdate').trim().notEmpty().withMessage('required').isDate(),
    validationErrors,
    createThumbnail,
    postCat
  );

catRouter
  .route('/:id')
  .get(param('id').isNumeric(), validationErrors, getCatById)
  .put(
    authenticateToken,
    body('cat_name').trim().optional(),
    body('weight')
      .trim()
      .optional()
      .isNumeric()
      .isFloat({max: 50})
      .withMessage('Weight cannot be higher than 50'),
    body('owner').trim().optional().isNumeric(),
    body('birthdate').trim().optional().isDate(),
    validationErrors,
    putCat
  )
  .delete(authenticateToken, deleteCat);

export default catRouter;
