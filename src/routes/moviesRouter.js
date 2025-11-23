import { Router } from "express";
import MovieController from "../controllers/MovieController.js";
import CommentController from "../controllers/CommentController.js";

const moviesRouter = Router()

moviesRouter.get(
    "/:tmdbId",
    MovieController.getMovieMetaData
);

moviesRouter.post(
    "/",
    MovieController.createOrUpdateMovie
);

moviesRouter.get(
    "/:movieId/comments",
    CommentController.getCommentsByMovie
);

moviesRouter.get(
    "/",
    MovieController.getAllMovies 
);

export default moviesRouter
