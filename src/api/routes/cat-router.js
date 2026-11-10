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
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

catRouter.route('/').get(logger, getCats).post(
  authenticateToken,
  upload.single('image'),
  // TODO: add validation and sanitization rules here
  validationErrors,
  createThumbnail,
  postCat
);

catRouter
  .route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default catRouter;
