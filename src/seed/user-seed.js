import User from '../module/user/user.mongo.js';
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";

export const seedUsers = async (numUsers = 10) => {
    try {
      await User.deleteMany({}); // Clear existing users
      const hashedPassword = await bcrypt.hash('test', 10);
      
      for (let i = 0; i < numUsers; i++) {
        const user = new User({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: hashedPassword,
          isVerified: true
        });
  
        await user.save();
      }
  
      console.log(`${numUsers} users created successfully!`);
    } catch (err) {
      console.error(err);
    }
  };