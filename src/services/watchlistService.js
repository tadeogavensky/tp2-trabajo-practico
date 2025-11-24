import { WatchList } from "../models/index.js";
import MovieService from "../services/moviesService.js";
import WATCHLIST_ERRORS from "../errors/watchlist.js";

class WatchlistService {
  constructor(movieService) {
    this.movieService = movieService;
  }

  findItem = async (movieId, userId) => {
    return await WatchList.findOne({
      where: { movieId, userId },
    });
  };

  getWatchlist = async (userId) => {
    const items = await WatchList.findAll({ where: { userId } });

    if (items && items.length > 0) {
      console.log(
        `getWatchlist --> Fetched watchlist for user ${userId}:`,
        items
      );
    } else {
      console.log(`Watchlist for user ${userId} is empty.`);
    }

    return items;
  };

  getWatchItemById = async (tmdbId, userId) => {
    const movie = await this.movieService.getMovieByTmdbId(tmdbId);
    if (!movie) throw new Error(WATCHLIST_ERRORS.MOVIE_NOT_FOUND);

    const item = await this.findItem(movie.id, userId);
    if (!item) throw new Error(WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST);

    return item;
  };

  addToWatchlist = async (tmdbId, userId) => {
    const movie = await this.movieService.getMovieByTmdbId(tmdbId);
    if (!movie) {
      throw new Error(WATCHLIST_ERRORS.MOVIE_NOT_FOUND);
    }

    const exists = await this.findItem(movie.id, userId);
    if (exists) {
      throw new Error(WATCHLIST_ERRORS.ITEM_ALREADY_IN_WATCHLIST);
    }

    return await WatchList.create({
      movieId: movie.id,
      userId,
    });
  };

  removeFromWatchlist = async (movieId, userId) => {
    const movie = await this.movieService.getMovieByTmdbId(movieId);
    if (!movie) {
      throw new Error(WATCHLIST_ERRORS.MOVIE_NOT_FOUND);
    }

    const exists = await this.findItem(movie.id, userId);

    if (!exists) {
      throw new Error(WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST);
    }

    await WatchList.destroy({ where: { movieId: movie.id, userId } });

    console.log(
      `removeFromWatchlist --> Removed item ${movieId} for user ${userId}.`
    );

    return true;
  };

  resetWatchlist = async (userId) => {
    const deleted = await WatchList.destroy({ where: { userId } });

    console.log(
      `resetWatchlist --> Deleted ${deleted} items for user ${userId}.`
    );

    return deleted;
  };
}

export default WatchlistService;