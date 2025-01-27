import express from 'express';
const app = express();

import  { mongodbConnect } from './service/db-connection.js';
import userRouter from './module/user/user.route.js';
import { appEnv } from './env.js';
import { requestResponseLogger } from './middleware/logger.middleware.js';

mongodbConnect();


// Middleware
app.use(express.json());
app.use(requestResponseLogger);


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRouter);

// Start server
app.listen(appEnv.PORT, () => {
  console.log(`Server is running on port ${appEnv.PORT}`);
});