import express from 'express';
import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import logger from '../../middlewares/logger.js';

import multer from 'multer';
import {createThumbnail} from '../../middlewares/upload.js';
import {authenticateToken} from '../../middlewares/authentication.js';
const upload = multer({dest: 'uploads/'});

const catRouter = express.Router();

catRouter
  .route('/')
  .get(logger, getCats)
  .post(authenticateToken, upload.single('image'), createThumbnail, postCat);

catRouter
  .route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default catRouter;
