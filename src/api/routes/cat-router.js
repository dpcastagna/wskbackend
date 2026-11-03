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
const upload = multer({dest: 'uploads/'});

const catRouter = express.Router();

catRouter
  .route('/')
  .get(logger, getCats)
  .post(upload.single('image'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
