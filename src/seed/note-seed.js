import { faker } from "@faker-js/faker";
import Notes  from "../module/notes/note.mongo.js";
import User from "../module/user/user.mongo.js";

export const seedNotes = async (numNotes = 10) => {
  try {
    const users = await User.find();
    await Notes.deleteMany({}); // Clear existing notes

    for (let i = 0; i < numNotes; i++) {
      const note = new Notes({
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs(),
        author: users[Math.floor(Math.random() * users.length)]._id,
      });

      await note.save();
    }

    console.log(`${numNotes} notes created successfully!`);
  } catch (err) {
    console.error(err);
  }
};
