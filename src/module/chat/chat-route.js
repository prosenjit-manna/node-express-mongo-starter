import express from 'express';
import { getMessages } from './get-messages.js';
import { authMiddleWare } from '../../middleware/auth-middleware.js';

const router = express.Router();

router.post('/messages', authMiddleWare, getMessages);

export default router;