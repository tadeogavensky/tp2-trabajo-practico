import { Router } from "express";
import { WatchlistController } from "../controllers/index.js";
import { authenticate } from "../middlewares/userMiddleware.js";
import watchlistErrorHandler from "../middlewares/watchlistErrorHandler.js";
//import {} from "../middlewares/idCheckMiddleware.js";

const watchlistRouter = Router()

// Get all items in watchlist
watchlistRouter.get("/",authenticate, watchlistErrorHandler, WatchlistController.getWatchlist);

// Get a specific item in watchlist by ID
watchlistRouter.get("/:id",authenticate, watchlistErrorHandler, WatchlistController.getWatchlistById);

// Check if a movie is in the watchlist by movie ID
watchlistRouter.get("/check/:id",authenticate, watchlistErrorHandler, WatchlistController.isInWatchlist); 

// Add a movie to the watchlist
watchlistRouter.post("/:id",authenticate, watchlistErrorHandler, WatchlistController.addToWatchlist);

// Remove a movie from the watchlist by movie ID
watchlistRouter.delete("/:id",authenticate, watchlistErrorHandler, WatchlistController.removeFromWatchlist); 

// Clear the entire watchlist
watchlistRouter.delete("/reset", authenticate, watchlistErrorHandler, WatchlistController.resetWatchlist); 

export default watchlistRouter;