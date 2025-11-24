import { Favorite } from "../models/index.js";
import FAVORITE_ERRORS from "../errors/favorites.js";	

class FavoriteService {
	async getFavoritesByUser(userId) {
		return await Favorite.findAll({ where: { userId } });
	}

	async isFavorite(userId, movieId) {
		const fav = await Favorite.findOne({ where: { userId, movieId } });
		return !!fav; //convierte el valor en booleano
	}

	async addFavorite(userId, movieId) {
		const exists = await Favorite.findOne({ where: { userId, movieId } });
		if (exists) {
			throw new Error(FAVORITE_ERRORS.MOVIE_ALREADY_IN_FAVORITES);
		}

		const favorite = await Favorite.create({ userId, movieId });
		return favorite;
	}

	async removeFavorite(userId, movieId) {
		const deleted = await Favorite.destroy({ where: { userId, movieId } });
		if (deleted === 0) {
			throw new Error(FAVORITE_ERRORS.FAVORITE_NOT_FOUND);
		}
	}
}

export default FavoriteService;
