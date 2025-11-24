import { Router } from "express";
import FavoriteController from "../controllers/FavoriteController.js";
import FavoritesService from "../services/favoritesService.js";
import { authenticate } from "../middlewares/userMiddleware.js";
import { 
    validateFavoriteBody, 
    validateUserIdParam,
    validateCheckFavoriteParams,
    favoriteErrorHandler
} from "../middlewares/favoritesMiddleware.js";

const favoritesRouter = Router();
const favoriteController = new FavoriteController(new FavoritesService());

// Obtener todos los favoritos de un usuario
favoritesRouter.get(
	"/user/:userId",
	authenticate,
	validateUserIdParam,
	favoriteController.getAllFavorites.bind(favoriteController)
);

// Verificar si una película está en favoritos
favoritesRouter.get(
	"/check/:userId/:movieId",
	authenticate,
	validateCheckFavoriteParams,
	favoriteController.checkFavorite.bind(favoriteController)
);

// Agregar a favoritos
favoritesRouter.post(
	"/",
	authenticate,
	validateFavoriteBody,
	favoriteController.addFavorite.bind(favoriteController)
);

// Eliminar favorito por id
favoritesRouter.delete(
	"/",
	authenticate,
	validateFavoriteBody,
	favoriteController.removeFavorite.bind(favoriteController)
);

favoritesRouter.use(favoriteErrorHandler);
export default favoritesRouter;