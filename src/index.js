import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import  { mongodbConnect } from './service/db-connection.js';


const app = express();
const port = process.env.PORT || 3000;

mongodbConnect();


// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});