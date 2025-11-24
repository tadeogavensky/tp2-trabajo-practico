class FavoriteController {
  constructor(favoriteService) {
    this.favoriteService = favoriteService;
  }

  getAllFavorites = async (req, res) => {
    console.log("Get favorites endpoint hit!");
    try {
      const favorites = await this.favoriteService.getFavoritesByUser(req.user.id);
      return res.status(200).json(favorites);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  addFavorite = async (req, res) => {
    console.log("Add to favorites endpoint hit!");
    try {
      const { movieId } = req.body;

      if (!movieId) {
        return res.status(400).json({ 
          error: 'movieId is required' 
        });
      }

      const favorite = await this.favoriteService.addFavorite(req.user.id, movieId);
      
      return res.status(201).json({
        message: 'Movie added to favorites',
        favorite
      });
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  removeFavorite = async (req, res) => {
    console.log("Remove from favorites endpoint hit!");
    try {
      const { movieId } = req.body; 

      if (!movieId) {
        return res.status(400).json({ 
          error: 'movieId is required' 
        });
      }    
      
      await this.favoriteService.removeFavorite(req.user.id, movieId);

      return res.status(200).json({ 
        message: 'Favorite removed successfully' 
      });
      
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  checkFavorite = async (req, res) => {
    console.log("Check favorite endpoint hit");
    try {
      const { movieId } = req.params;
      
      const isFavorite = await this.favoriteService.isFavorite(req.user.id, movieId);
      
      return res.status(200).json({ 
        isFavorite 
      });
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default FavoriteController;
