import express from 'express';
import { noteCreateValidator } from './note-create/note-create.validator.js';
import { noteCreate } from './note-create/note-create.js';
import { authMiddleWare } from '../../middleware/auth-middleware.js';
import { noteUpdate } from './note-update/note-update.js';

const notesRouter = express.Router();

notesRouter.post('/create', [authMiddleWare, noteCreateValidator], noteCreate);
notesRouter.post('/update/:id', [authMiddleWare, noteCreateValidator], noteUpdate);

export default notesRouter;
