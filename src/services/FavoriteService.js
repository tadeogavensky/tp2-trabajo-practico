import { Favorite, Movie } from "../models/index.js";
import FAVORITE_ERRORS from "../errors/favorite.js";

class FavoriteService {
  getFavoritesByUser = async (userId) => {
    return await Favorite.findAll({ where: { userId }, include: Movie});
  };

  isFavorite = async (userId, movieId) => {
    const fav = await Favorite.findOne({ where: { userId, movieId } });
    return !!fav;
  };

  addFavorite = async (userId, movieId) => {
    const exists = await Favorite.findOne({ where: { userId, movieId } });
    if (exists) {
      throw new Error(FAVORITE_ERRORS.MOVIE_ALREADY_IN_FAVORITES);
    }

    const favorite = await Favorite.create({ userId, movieId });
    return favorite;
  };

  removeFavorite = async (userId, movieId) => {
    const deleted = await Favorite.destroy({ where: { userId, movieId } });
    if (deleted === 0) {
      throw new Error(FAVORITE_ERRORS.FAVORITE_NOT_FOUND);
    }
  };
}

export default FavoriteService;
