import { Router } from "express";
import FavoriteController from "../controllers/FavoriteController.js";
import favoritesService from "../services/favoritesService.js";
import { authenticate } from "../middlewares/userMiddleware.js";

const favoritesRouter = Router();

const favoriteController = new FavoriteController(favoritesService);

// Obtener todos los favoritos de un usuario
favoritesRouter.get(
	"/user/:userId",
	authenticate,
	favoriteController.getAllFavorites.bind(favoriteController)
);

// Verificar si una película está en favoritos
favoritesRouter.get(
	"/check/:userId/:movieId",
	authenticate,
	favoriteController.checkFavorite.bind(favoriteController)
);

// Agregar a favoritos
favoritesRouter.post(
	"/",
	authenticate,
	favoriteController.addFavorite.bind(favoriteController)
);

// Eliminar favorito por id
favoritesRouter.delete(
	"/",
	authenticate,
	favoriteController.removeFavorite.bind(favoriteController)
);

export default favoritesRouter;