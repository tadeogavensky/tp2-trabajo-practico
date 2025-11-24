import { generateJWT, hashPassword } from "../utils/user.js";
import USER_FIELD_ERRORS from "../errors/user.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }
   register = async (req, res) => {
    console.log("Signup endpoint hit! 🧑🏻‍🦱");

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

      return res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  login = async (req, res) => {
    console.log("Login endpoint hit! 🧑🏻‍🦱");
    try {
      const { email, password, rememberMe } = req.body;
      const user = await this.userService.authenticateUser(email, password);
      console.log("🧉 ~ UserController ~ login ~ user ➡️ ", user)
      if (!user) {
        return res
          .status(401)
          .json({ error: USER_FIELD_ERRORS.INVALID_CREDENTIALS });
      }
      const token = generateJWT(
        { userId: user.id, email: user.email, username: user.username },
        rememberMe ? "7d" : "1h"
      );
      console.log("JWT token generated", token);
      res.cookie("payload", {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
        },
      });
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  getUserProfile = async (req, res) => {
    try {
      const user = await this.userService.getUserById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      const { hashedPassword, ...safeUser } = user.toJSON();
      return res.status(200).json(safeUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  updateUser = async (req, res) => {
    try {
      const userData = req.body;
      const updatedUser = await this.userService.updateUser(
        req.user.id,
        userData
      );
      const { hashedPassword, ...safeUser } = updatedUser.toJSON(); // Exclude hashedPassword
      return res.status(200).json(safeUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  deleteUser = async (req, res) => {
    try {
      await this.userService.deleteUser(req.user.id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
