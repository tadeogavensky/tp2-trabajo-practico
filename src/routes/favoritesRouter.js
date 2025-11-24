import { Router } from "express";
import { authenticate } from "../middlewares/userMiddleware.js";
import {
  validateFavoriteBody,
  validateCheckFavoriteParams,
  favoriteErrorHandler,
} from "../middlewares/favoritesMiddleware.js";

import { favoriteController } from "../containers/favoriteContainer.js";

const favoritesRouter = Router();

favoritesRouter.get(
  "/user",
  authenticate,
  favoriteController.getAllFavorites
);

favoritesRouter.get(
  "/check/:movieId",
  authenticate,
  validateCheckFavoriteParams,
  favoriteController.checkFavorite
);

favoritesRouter.post(
  "/",
  authenticate,
  validateFavoriteBody,
  favoriteController.addFavorite
);

favoritesRouter.delete(
  "/",
  authenticate,
  validateFavoriteBody,
  favoriteController.removeFavorite
);

favoritesRouter.use(favoriteErrorHandler);

export default favoritesRouter;
