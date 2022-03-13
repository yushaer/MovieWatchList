import express from 'express';
import { login,register,get_user } from '../controllers/users.js';
import auth from '../middleware/auth.js';
const userRouter = express.Router();
userRouter.post('/login',login);

userRouter.post('/register',register);
userRouter.get('/',auth,get_user);
export default userRouter;