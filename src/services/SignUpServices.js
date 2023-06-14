import { hash } from 'bcrypt';
import Users from 'src/models/UserSchema';

const createUserService = async (email, username, password) => {
  try {
    const checkexsiting = await Users.findOne({ email });
    if (checkexsiting) {
      throw 'User Already Exists...!';
    }
    const newUser = await Users.create({
      username,
      email,
      password: await hash(password, 10),
    });
    if (newUser) {
      return newUser;
    }
  } catch (error) {
    throw error;
  }
};

export { createUserService };
