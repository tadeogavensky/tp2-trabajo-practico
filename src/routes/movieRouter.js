import { Router } from "express";
import { movieController } from "../containers/movieContainer.js";
import { commentController } from "../containers/commentContainer.js";

import { authenticate } from "../middlewares/userMiddleware.js";

const movieRouter = Router();

movieRouter.get("/", movieController.getAllMovies);

movieRouter.get("/:tmdbId", movieController.getMovieMetaData);

movieRouter.post("/", authenticate, movieController.createOrUpdateMovie);

movieRouter.get("/:movieId/comments", commentController.getCommentsByMovie);

export default movieRouter;
