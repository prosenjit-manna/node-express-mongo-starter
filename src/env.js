import { cleanEnv, str } from "envalid";
import dotenv from "dotenv";
dotenv.config();

export const appEnv = cleanEnv(process.env, {
  MONGO_URL: str({
    example: "mongodb://root:password@localhost:27017?authSource=admin",
  }),
  NODE_ENV: str({
    default: "development",
    choices: ["development", "test", "production", "staging"],
  }),
  PORT: str({ default: "3000" }),
  JSON_WEB_TOKEN_SECRET: str({ default: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'}),
  JSON_WEB_TOKEN_EXPIRY: str({ default: '1h'}),
});

console.log('NODE_ENV', appEnv.NODE_ENV);