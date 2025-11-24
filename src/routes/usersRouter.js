import { Router } from "express";
import {
  authenticate,
  checkUserEmailExists,
  checkUserUsernameExists,
  validateLoginFields,
  validateSignUpFields,
  validateUpdateFields,
} from "../middlewares/userMiddleware.js";
import { userController } from "../containers/userContainer.js";

const usersRouter = Router();

usersRouter.get("/test", (req, res) => {
  res.send("User router hit!");
});
usersRouter.post(
  "/register",
  validateSignUpFields,
  checkUserEmailExists,
  checkUserUsernameExists,
  userController.register
);

usersRouter.post("/login", validateLoginFields, userController.login);

usersRouter.get("/profile", authenticate, userController.getUserProfile);

usersRouter.put(
  "/",
  authenticate,
  validateUpdateFields,
  checkUserEmailExists,
  checkUserUsernameExists,
  userController.updateUser
);

usersRouter.delete("/", authenticate, userController.deleteUser);

export default usersRouter;
