import jwt from 'jsonwebtoken';
import { appEnv } from '../env.js';

export function verifyEmailMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token?.replace('Bearer ', ''), appEnv.JSON_WEB_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
