import express from 'express';
import { getUser } from './get-user.js';
import { userSignup } from './user-register.js';
import { userLogin } from './user-login.js';
import { authMiddleWare } from '../../middleware/auth-middleware.js';
import { currentUser } from './current-user.js';
import { VerifySignup } from './verify-signup.js';
import { verifyEmailMiddleware } from '../../middleware/verify-email.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', userSignup);
userRouter.post('/login', userLogin);
userRouter.get('/current-user', authMiddleWare, currentUser);
userRouter.get('/get-user/:id', authMiddleWare, getUser);
userRouter.get('/verify-signup', verifyEmailMiddleware, VerifySignup);


export default userRouter;
