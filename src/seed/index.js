import { mongodbConnect } from "../service/db-connection.js";
import { seedUsers } from "./user-seed.js";
import { seedNotes } from "./note-seed.js";

async function main() {
  const mongoConnection = await mongodbConnect();
  await seedUsers(10);
  await seedNotes(10);
  await mongoConnection.disconnect();
}

main();