import { WatchList } from "../models/index.js";
import MovieService from "../services/moviesService.js";
import WATCHLIST_ERRORS from "../errors/watchlist.js";

class WatchListService {
  constructor() {
    this.movieService = new MovieService();
  }
  // PRIVATE helper - does NOT throw
  async findItem(movieId, userId) {
    return await WatchList.findOne({
      where: { movieId, userId },
    });
  }

  // GET all items
  async getWatchlist(userId) {
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
  }

  // GET one item (public) - throws if not found
    async getWatchItemById(tmdbId, userId) {
        const movie = await this.movieService.getMovieByTmdbId(tmdbId);
        if (!movie) throw new Error(WATCHLIST_ERRORS.MOVIE_NOT_FOUND);

        const item = await this.findItem(movie.id, userId);
        if (!item) throw new Error(WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST);

        return item;
    }

  // ADD
  async addToWatchlist(tmdbId, userId) {
    // 1. Find movie by tmdbId (returns the movie object)
    const movie = await this.movieService.getMovieByTmdbId(tmdbId);
    if (!movie) {
      throw new Error(WATCHLIST_ERRORS.MOVIE_NOT_FOUND);
    }

    // 2. Check if already in watchlist
    const exists = await this.findItem(movie.id, userId);
    if (exists) {
      throw new Error(WATCHLIST_ERRORS.ITEM_ALREADY_IN_WATCHLIST);
    }

    // 3. Insert USING THE INTERNAL DB ID, NOT TMDB ID
    return await WatchList.create({
      movieId: movie.id, // ✔ fixed
      userId,
    });
  }
  // REMOVE
  async removeFromWatchlist(movieId, userId) {
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
  }

  // CLEAR all
  async resetWatchlist(userId) {
    const deleted = await WatchList.destroy({ where: { userId } });

    console.log(
      `resetWatchlist --> Deleted ${deleted} items for user ${userId}.`
    );

    return deleted;
  }
}

export default WatchListService;
