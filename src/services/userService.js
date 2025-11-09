import User from "../../models/User.js";
import { comparePassword } from "../utils/user.js";
class UserService {
  async getAllUsers() {
    const users = await User.findAll();

    return users;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async createUser({
    firstName,
    lastName,
    age,
    username,
    email,
    hashedPassword,
  }) {
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
  }

  async authenticateUser(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    if (user && (await comparePassword(password, user.hashedPassword))) {
      return user;
    }
  }

  async updateUser(id, userData) {
    const user = await User.findByPk(id);

    await user.update(userData);
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);

    await user.destroy();
    return user;
  }
}

export default UserService;
