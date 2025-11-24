import { User } from "../models/index.js";
import { comparePassword } from "../utils/user.js";
class UserService {
  getAllUsers = async () => {
    const users = await User.findAll();

    return users;
  };

  getUserById = async (id) => {
    const user = await User.findByPk(id);
    return user;
  };

  createUser = async ({
    firstName,
    lastName,
    age,
    username,
    email,
    hashedPassword,
  }) => {
    const newUser = await User.create({
      firstName,
      lastName,
      age,
      username,
      email,
      hashedPassword,
    });

    const { hashedPassword: _, ...safeUser } = newUser.toJSON(); // Exclude hashedPassword
    return safeUser;
  };

  authenticateUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    if (user && (await comparePassword(password, user.hashedPassword))) {
      return user;
    }
  };

  updateUser = async (id, userData) => {
    const user = await User.findByPk(id);

    await user.update(userData);
    return user;
  };

  deleteUser = async (id) => {
    const user = await User.findByPk(id);

    await user.destroy();
    return user;
  };
}

export default UserService;
