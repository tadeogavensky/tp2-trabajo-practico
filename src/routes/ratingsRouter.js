import { Router } from "express";
import { authenticate } from "../middlewares/userMiddleware.js";
import {
  validateRatingBody,
  ratingErrorHandler,
} from "../middlewares/ratingMiddleware.js";
import { ratingController } from "../containers/ratingContainer.js";

const ratingsRouter = Router();

ratingsRouter.get(
  "/user",
  authenticate,
  ratingController.getAllRatings
);

ratingsRouter.get(
  "/check/:movieId",
  authenticate,
  ratingController.checkRating
);

ratingsRouter.post(
  "/",
  authenticate,
  validateRatingBody,
  ratingController.addRating
);

ratingsRouter.put(
  "/",
  authenticate,
  validateRatingBody,
  ratingController.updateRating
);

ratingsRouter.delete("/", authenticate, ratingController.removeRating);

ratingsRouter.use(ratingErrorHandler);

export default ratingsRouter;
