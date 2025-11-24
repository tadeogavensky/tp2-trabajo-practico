import RatingService from "../services/RatingService.js";
import RatingController from "../controllers/RatingController.js";

const ratingService = new RatingService();
const ratingController = new RatingController(ratingService);


export {ratingService, ratingController };