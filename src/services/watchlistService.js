/* import { WatchList } from "../models/index.js";
import WATCHLIST_ERRORS from "../errors/watchlist.js";

class WatchListService {
  async getWatchlist(userId) {
    return await WatchList.findAll({
      where: { userId },
    });
    console.log("Fetched watchlist for user:", userId);
  }
  async getWatchlistById(movieId, userId) {
    const watchlistItem = await WatchList.findOne({
        where: { movieId, userId },
        });
    if (!watchlistItem) {
        throw new Error(WATCHLIST_ERRORS.ITEM_NOT_FOUND);
    }
    console.log("Fetched watchlist item:", movieId, "for user:", userId);
    return watchlistItem;
  }
  async addToWatchlist(movieId, userId) {
    const alreadyInWatchlist = await this.isInWatchlist(movieId, userId);
    if (alreadyInWatchlist) {
      throw new Error(WATCHLIST_ERRORS.ITEM_ALREADY_IN_WATCHLIST);
    }
    console.log("Adding to watchlist:", { movieId, userId });
    return await WatchList.create({ movieId: movieId, userId });
  }
  async removeFromWatchlist(movieId, userId) {
    return await WatchList.destroy({
      where: { movieId, userId },
    });
  }
  async isInWatchlist(movieId, userId) {
    const watchlistItem = await WatchList.findOne({
      where: { movieId: movieId, userId },
    });
    return !!watchlistItem;
  }
  async resetWatchlist(userId) {
    return await WatchList.destroy({
      where: { userId },
    });
  }
}

export default WatchListService;
 */

import { WatchList } from "../models/index.js";
import WATCHLIST_ERRORS from "../errors/watchlist.js";

class WatchListService {
  async getWatchlist(userId) {
    const items = await WatchList.findAll({ where: { userId } });

    if (!items || items.length === 0) {
      throw new Error(WATCHLIST_ERRORS.WATCHLIST_EMPTY);
    }

    return items;
  }

  async getWatchlistById(movieId, userId) {
    const item = await WatchList.findOne({ where: { movieId, userId } });

    if (!item) {
      throw new Error(WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST);
    }

    return item;
  }

  async addToWatchlist(movieId, userId) {
    const exists = await this.isInWatchlist(movieId, userId);

    if (exists) {
      throw new Error(WATCHLIST_ERRORS.ITEM_ALREADY_IN_WATCHLIST);
    }

    return await WatchList.create({ movieId, userId });
  }

  async removeFromWatchlist(movieId, userId) {
    const deleted = await WatchList.destroy({
      where: { movieId, userId },
    });

    if (!deleted) {
      throw new Error(WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST);
    }

    return deleted;
  }

  async isInWatchlist(movieId, userId) {
    const item = await WatchList.findOne({
      where: { movieId, userId },
    });

    return !!item;
  }

  async resetWatchlist(userId) {
    const deleted = await WatchList.destroy({ where: { userId } });

    if (!deleted) {
      throw new Error(WATCHLIST_ERRORS.WATCHLIST_NOT_FOUND);
    }

    return deleted;
  }
}

export default WatchListService;
