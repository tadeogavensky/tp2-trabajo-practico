class FavoriteController {
  constructor(favoriteService) {
    this.favoriteService = favoriteService;
  }

  // Obtener todos los favoritos de un usuario
  async getAllFavorites(req, res) {
    console.log("Get favorites endpoint hit!");
    try {
      const { userId } = req.params;
      const favorites = await this.favoriteService.getFavoritesByUser(userId);
      // Devuelve el array de favoritos
      return res.status(200).json(favorites);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Agregar película a favoritos
  async addFavorite(req, res) {
    console.log("Add to favorites endpoint hit!");
    try {
      const { userId, movieId } = req.body;

      if (!userId || !movieId) {
        return res.status(400).json({ 
          error: 'userId and movieId are required' 
        });
      }

      const favorite = await this.favoriteService.addFavorite(userId, movieId);
      
      return res.status(201).json({
        message: 'Movie added to favorites',
        favorite
      });
      
    } catch (error) {
      // Si el error es por duplicado, devuelve 400 en lugar de 500
      if (error.message.includes('already in favorites')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  // Eliminar de favoritos
  async removeFavorite(req, res) {
    console.log("Remove from favorites endpoint hit!");
    try {
      const { userId, movieId } = req.body; 

      if (!userId || !movieId) {
        return res.status(400).json({ 
          error: 'userId and movieId are required' 
        });
      }    
      
      await this.favoriteService.removeFavorite(userId, movieId);

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

  // Verificar si esta en favoritos
  async checkFavorite(req, res) {
    console.log("Check favorite endpoint hit");
    try {
      const { userId, movieId } = req.params;
      
      const isFavorite = await this.favoriteService.isFavorite(userId, movieId);
      
      return res.status(200).json({ 
        isFavorite 
      });
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default FavoriteController;
