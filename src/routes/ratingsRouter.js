import { Router } from "express";
import RatingController from "../controllers/RatingController.js";
import RatingService from "../services/ratingsService.js";
import { authenticate } from "../middlewares/userMiddleware.js";
import { 
    validateRatingBody,
    ratingErrorHandler
} from "../middlewares/ratingMiddleware.js";

const ratingsRouter = Router();
const ratingController = new RatingController(new RatingService());

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
    validateRatingBody,
    ratingController.addRating.bind(ratingController)
);

ratingsRouter.put(
    "/",
    authenticate,
    validateRatingBody,
    ratingController.updateRating.bind(ratingController)
);

ratingsRouter.delete(
    "/",
    authenticate,
    ratingController.removeRating.bind(ratingController)
);

ratingsRouter.use(ratingErrorHandler);
export default ratingsRouter;