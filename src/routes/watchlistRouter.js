import { Router } from "express";
import { authenticate } from "../middlewares/userMiddleware.js";
import { watchlistErrorHandler } from "../middlewares/watchlistMiddleware.js";
import { watchlistController } from "../containers/watchlistContainer.js";

const watchlistRouter = Router();

watchlistRouter.delete(
  "/reset",
  authenticate,
  watchlistController.resetWatchlist
);

watchlistRouter.get("/all", authenticate, watchlistController.getWatchlist);

watchlistRouter.get("/:id", authenticate, watchlistController.getWatchItemById);

watchlistRouter.post("/:id", authenticate, watchlistController.addToWatchlist);

watchlistRouter.delete(
  "/:id",
  authenticate,
  watchlistController.removeFromWatchlist
);

watchlistRouter.use(watchlistErrorHandler);

export default watchlistRouter;
