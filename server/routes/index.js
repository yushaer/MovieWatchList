import express from 'express';
import userRouter from './users.js';
import movieRouter from './movies.js';
const rootRouter = express.Router();
rootRouter.use('/movies',movieRouter);
rootRouter.get('/',(req,res)=>{
    res.status(200).json({"message":"You have accessed rest-api for Movie Watch List made by Yushae Raza"})
});
rootRouter.use('/user' ,userRouter);
export default rootRouter;
