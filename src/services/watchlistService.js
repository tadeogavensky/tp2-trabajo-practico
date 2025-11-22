import { WatchList } from "../models/index.js";
import WATCHLIST_ERRORS from "../errors/watchlist.js";

class WatchListService {
    async getWatchlist(userId) {
        const items = await WatchList.findAll({ where: { userId } });
        
        if(items && items.length > 0) {
            console.log(
                `getWatchlist --> Fetched watchlist for user ${userId}:`,
                items
            );
        } else {
            console.log(`Watchlist for user ${userId} is empty.`);
        }

        return items;
    }

    async getWatchItemById(movieId, userId) {
        const item = await WatchList.findOne({ where: { movieId, userId } });

        if (!item) {
        throw new Error(WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST);
        } else {
            console.log(
                `getWatchItemById --> Fetched item ${movieId} for user ${userId}:`,
                item
            );
            return item;
        }
    }

    async addToWatchlist(movieId, userId) {
        const exists = await this.getWatchItemById(movieId, userId);

        if (exists) {
        throw new Error(WATCHLIST_ERRORS.ITEM_ALREADY_IN_WATCHLIST);
        } else {
            console.log(
                `addToWatchlist --> Adding item ${movieId} to watchlist for user ${userId}.`
            );
            return await WatchList.create({ movieId, userId });
        }

        
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

    async resetWatchlist(userId) {
    const deleted = await WatchList.destroy({ where: { userId } });
    console.log(`Reset watchlist for user ${userId}. Deleted items:`, deleted);
    return deleted;
    }
}
export default WatchListService;
