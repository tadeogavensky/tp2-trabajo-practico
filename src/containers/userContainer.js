import UserService from "../services/UserService.js";
import UserController from "../controllers/UserController.js";

const userService = new UserService();
const userController = new UserController(userService);

export { userService, userController };