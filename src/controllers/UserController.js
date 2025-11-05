import { hashPassword } from "../utils/user.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async createUser(req, res) {
    try {
      const { firstName, lastName, age, username, email, password } = req.body;
      const hashedPassword = await hashPassword(password);

      const newUser = await this.userService.createUser({
        firstName,
        lastName,
        age,
        username,
        email,
        hashedPassword,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const isAuthenticated = await this.userService.authenticateUser(
        email,
        password
      );
      if (!isAuthenticated) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
