import FavoriteService from "../services/FavoriteService.js";
import FavoriteController from "../controllers/FavoriteController.js";

const favoriteService = new FavoriteService();
const favoriteController = new FavoriteController(favoriteService);

export { favoriteService, favoriteController };