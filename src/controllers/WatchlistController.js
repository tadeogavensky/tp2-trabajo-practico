class WatchlistController {
  constructor(watchlistService) {
    this.watchlistService = watchlistService;
  }
  getWatchlist = async (req, res) => {
    const userId = req.user.id;
    try {
      const watchlist = await this.watchlistService.getWatchlist(userId);
      return res.status(200).json(watchlist);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  getWatchItemById = async (req, res) => {
    const userId = req.user.id;
    const movieId = req.params.id;
    try {
      const item = await this.watchlistService.getWatchItemById(
        movieId,
        userId
      );
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  addToWatchlist = async (req, res) => {
    const userId = req.user.id;
    const movieId = req.params.id;
    try {
      const newItem = await this.watchlistService.addToWatchlist(
        movieId,
        userId
      );
      return res.status(201).json(newItem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  removeFromWatchlist = async (req, res) => {
    const userId = req.user.id;
    const movieId = req.params.id;
    try {
      await this.watchlistService.removeFromWatchlist(movieId, userId);
      return res.status(204).json({
        message: "Item removed from watchlist successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  resetWatchlist = async (req, res) => {
    const userId = req.user.id;
    try {
      await this.watchlistService.resetWatchlist(userId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default WatchlistController;
