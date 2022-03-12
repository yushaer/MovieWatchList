import express from 'express';
import userRouter from './users.js';
import movieRouter from './movies.js';
const rootRouter = express.Router();
rootRouter.use('/movies',movieRouter);
rootRouter.use('/user' ,userRouter);
export default rootRouter;
