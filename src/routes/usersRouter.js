import { Router } from "express";
import {
  authenticate,
  checkUserEmailExists,
  checkUserUsernameExists,
  validateLoginFields,
  validateSignUpFields,
} from "../middlewares/userMiddleware.js";

import { UserController } from "../controllers/index.js";
import UserService from "../services/userService.js";
const usersRouter = Router();

const userController = new UserController(new UserService());

usersRouter.get("/test", (req, res) => {
  res.send("User router hit!");
});
usersRouter.post(
  "/register",
  validateSignUpFields,
  checkUserEmailExists,
  checkUserUsernameExists,
  userController.createUser.bind(userController)
);

usersRouter.post(
  "/login",
  validateLoginFields,
  userController.login.bind(userController)
);

usersRouter.get(
  "/profile",
  authenticate,
  userController.getUserProfile.bind(userController)
);

export default usersRouter;
