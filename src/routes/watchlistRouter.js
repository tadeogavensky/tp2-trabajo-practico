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
   watchlistController.resetWatchlist.bind(watchlistController)
);

// GET all
watchlistRouter.get(
  "/all",
  authenticate,
  watchlistController.getWatchlist.bind(watchlistController)
);

// GET one
watchlistRouter.get(
  "/:id",
  authenticate,
  watchlistController.getWatchItemById.bind(watchlistController)
);

// ADD movie
watchlistRouter.post(
  "/:id",
  authenticate,
  watchlistController.addToWatchlist.bind(watchlistController)
);

// DELETE movie
watchlistRouter.delete(
  "/:id",
  authenticate,
  watchlistController.removeFromWatchlist.bind(watchlistController)
);
watchlistRouter.use(watchlistErrorHandler);
export default watchlistRouter;
