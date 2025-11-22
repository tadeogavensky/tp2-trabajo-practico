import WatchListService from "../services/watchlistService.js";

class WatchlistController {
  constructor(WatchListService) {
    this.watchlistService = WatchListService;
  }
  async getWatchlist(req, res) {
    const userId = req.user.userId;
    try {
      const watchlist = await this.watchlistService.getWatchlist(userId);
      res.status(200).json(watchlist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getWatchItemById(req, res) {
    const userId = req.user.userId;
    const movieId = req.params.id;
    try {
      const item = await this.watchlistService.getWatchItemById(
        movieId,
        userId
      );
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async addToWatchlist(req, res) {
    const userId = req.user.userId;
    const movieId = req.params.id;
    try {
      const newItem = await this.watchlistService.addToWatchlist(
        movieId,
        userId
      );
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async removeFromWatchlist(req, res) {
    const userId = req.user.userId;
    const movieId = req.params.id;
    try {
      await this.watchlistService.removeFromWatchlist(movieId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async resetWatchlist(req, res) {
    const userId = req.user.userId;
    try {
      await this.watchlistService.resetWatchlist(userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default WatchlistController;
