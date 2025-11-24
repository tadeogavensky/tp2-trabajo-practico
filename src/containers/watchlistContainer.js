import WatchlistService from "../services/WatchlistService.js";
import WatchlistController from "../controllers/WatchlistController.js";
import { movieService } from "./movieContainer.js";

const watchlistService = new WatchlistService(movieService);
const watchlistController = new WatchlistController(watchlistService);

export { watchlistService, watchlistController };
