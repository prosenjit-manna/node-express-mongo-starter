import express from 'express';
import { getUser } from './get-user.js';
import { userSignup } from './user-signup.js';
import { userLogin } from './user-login.js';
import { authMiddleWare } from '../../middleware/auth-middleware.js';
import { currentUser } from './current-user.js';

const userRouter = express.Router();

userRouter.post('/register', userSignup);
userRouter.post('/login', userLogin);
userRouter.get('/current-user', authMiddleWare, currentUser);
userRouter.get('/get-user/:id', authMiddleWare, getUser);


export default userRouter;
