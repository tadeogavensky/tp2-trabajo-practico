import { WatchList } from "../models/index.js";
import WATCHLIST_ERRORS from "../errors/watchlist.js";

class WatchListService {
  // PRIVATE helper - does NOT throw
  async findItem(movieId, userId) {
    return await WatchList.findOne({ where: { movieId, userId } });
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
  async getWatchItemById(movieId, userId) {
    const item = await this.findItem(movieId, userId);

    if (!item) {
      throw new Error(WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST);
    }

    console.log(
      `getWatchItemById --> Fetched item ${movieId} for user ${userId}:`,
      item
    );

    return item;
  }

  // ADD
    async addToWatchlist(movieId, userId) {
        // 1. Verify that the movie exists
/*         const movie = await Movie.findByPk(movieId);
            if (!movie) {
            throw new Error(WATCHLIST_ERRORS.MOVIE_NOT_FOUND);
        } */

        // 2. Verify that it's not already in the user's watchlist
        const exists = await this.findItem(movieId, userId);
            if (exists) {
            throw new Error(WATCHLIST_ERRORS.ITEM_ALREADY_IN_WATCHLIST);
        }

        console.log(
            `addToWatchlist --> Adding item ${movieId} to watchlist for user ${userId}.`
        );

        // 3. If everything is valid → create entry
        return await WatchList.create({ movieId, userId });
    }

  // REMOVE
  async removeFromWatchlist(movieId, userId) {
    const exists = await this.findItem(movieId, userId);

    if (!exists) {
      throw new Error(WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST);
    }

    await WatchList.destroy({ where: { movieId, userId } });

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
