import { Router } from "express";
import WatchlistController from "../controllers/WatchlistController.js";
import WatchListService from "../services/watchlistService.js";
import { authenticate } from "../middlewares/userMiddleware.js";
import { watchlistErrorHandler } from "../middlewares/watchlistMiddleware.js";

const watchlistRouter = Router();

const watchlistController = new WatchlistController(new WatchListService());

// CLEAR watchlist
watchlistRouter.delete(
  "/reset",
  authenticate,
  watchlistErrorHandler,
  watchlistController.resetWatchlist.bind(watchlistController)
);

// GET all
watchlistRouter.get(
  "/all",
  authenticate,
  watchlistErrorHandler,
  watchlistController.getWatchlist.bind(watchlistController)
);

// GET one
watchlistRouter.get(
  "/:id",
  authenticate,
  watchlistErrorHandler,
  watchlistController.getWatchItemById.bind(watchlistController)
);

// ADD movie
watchlistRouter.post(
  "/:id",
  authenticate,
  watchlistErrorHandler,
  watchlistController.addToWatchlist.bind(watchlistController)
);

// DELETE movie
watchlistRouter.delete(
  "/:id",
  authenticate,
  watchlistErrorHandler,
  watchlistController.removeFromWatchlist.bind(watchlistController)
);

export default watchlistRouter;
