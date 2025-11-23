import { Router } from "express";
import RatingController from "../controllers/RatingController.js";
import ratingService from "../services/ratingsService.js";
import { authenticate } from "../middlewares/userMiddleware.js";

const ratingsRouter = Router();
const ratingController = new RatingController(ratingService);

ratingsRouter.get(
    "/user/:userId",
    authenticate,
    ratingController.getAllRatings.bind(ratingController)
);

//verificar si una pelicula fue calificada
ratingsRouter.get(
    "/check/:userId/:movieId",
    authenticate,
    ratingController.checkRating.bind(ratingController)
)

ratingsRouter.post(
    "/",
    authenticate,
    ratingController.addRating.bind(ratingController)
);

ratingsRouter.put(
    "/",
    authenticate,
    ratingController.updateRating.bind(ratingController)
);

ratingsRouter.delete(
    "/",
    authenticate,
    ratingController.removeRating.bind(ratingController)
);

export default ratingsRouter