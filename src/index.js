import express from 'express';
const app = express();
import { appEnv } from './env.js';
import { createChatServer } from './module/chat/chat-server.js';

import  { mongodbConnect } from './service/db-connection.js';
import userRouter from './module/user/user.route.js';
import { requestResponseLogger } from './middleware/logger.middleware.js';
import notesRouter from './module/notes/notes-route.js';
import chatRouter from './module/chat/chat-route.js';
mongodbConnect();


// Middleware
app.use(express.json());
app.use(requestResponseLogger);


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);
app.use('/api/chat', chatRouter);

// Start server
const server = app.listen(appEnv.PORT, () => {
  console.log(`Server is running on port ${appEnv.PORT}`);
});

createChatServer(server);
