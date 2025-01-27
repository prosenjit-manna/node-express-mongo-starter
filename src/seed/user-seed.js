import User from '../model/user.mongo.js';
import { faker } from '@faker-js/faker';

export const seedUsers = async (numUsers = 10) => {
    try {
      await User.deleteMany({}); // Clear existing users
  
      for (let i = 0; i < numUsers; i++) {
        const user = new User({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        });
  
        await user.save();
      }
  
      console.log(`${numUsers} users created successfully!`);
    } catch (err) {
      console.error(err);
    }
  };