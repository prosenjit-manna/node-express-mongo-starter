import { cleanEnv, str } from 'envalid';
import dotenv from 'dotenv';
dotenv.config();

export const appEnv = cleanEnv(process.env, {
    MONGO_URL: str({ example: 'mongodb://root:password@localhost:27017?authSource=admin' }),
    NODE_ENV: str({ default: 'development', choices: ['development', 'test', 'production', 'staging'] }),
  })