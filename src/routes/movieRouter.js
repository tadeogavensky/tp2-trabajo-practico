import { Router } from "express";
import MovieController from "../controllers/MovieController.js";
import CommentController from "../controllers/CommentController.js";
import MovieService from "../services/movieService.js";

const movieRouter = Router();

const movieController = new MovieController(new MovieService());

movieRouter.get(
  "/:tmdbId",
  (req, res, next) => movieController.getMovieMetaData(req, res, next)
);

movieRouter.post(
  "/",
  (req, res, next) => movieController.createOrUpdateMovie(req, res, next)
);

movieRouter.get(
  "/:movieId/comments",
  (req, res, next) => CommentController.getCommentsByMovie(req, res, next)
);

movieRouter.get(
  "/",
  (req, res, next) => movieController.getAllMovies(req, res, next)
);

export default movieRouter;
