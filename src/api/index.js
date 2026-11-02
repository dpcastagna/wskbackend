import express from 'express';
import catRouter from './routes/cat-router.js';

const router = express.Router();

router.use('/cats', catRouter);

//router.use('/user', userRouter);

export default router;
