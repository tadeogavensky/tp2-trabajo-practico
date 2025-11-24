class RatingController {
  constructor(ratingService) {
    this.ratingService = ratingService;
  }

  //obtener todas las calificaciones de un usuario
  async getAllRatings(req, res) {
    console.log("Get ratings endpoint hit!");
    try {
      const { userId } = req.params;
      const ratings = await this.ratingService.getRatingsByUser(userId);
      res.status(200).json(ratings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // agregar rating
  async addRating(req, res) {
    console.log("Add rating endpoint hit!");
    try {
      const { userId, movieId, score } = req.body;
      if (!userId || !movieId || score == null) {
        return res.status(400).json({
          error: 'userId, movieId and score are required'
        });
      }

      const rating = await this.ratingService.addRating(userId, movieId, score);
      return res.status(201).json({
        message: 'Rating added successfully',
        rating
      });

    } catch (error) {
      if (error.message.includes('already rated')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
  
    }
  } 
  
  //update rating
  async updateRating(req, res) {
    console.log("Update rating endpoint hit!");
    try {
      const { userId, movieId, score } = req.body;
      if (!userId || !movieId || score == null) {
        return res.status(400).json({
          error: 'userId, movieId and score are required'
        });
      }
      const rating = await this.ratingService.updateRating(userId, movieId, score);
      return res.status(200).json({
        message: 'Rating updated successfully',
        rating
      });
    } catch (error) {
      if (error.message.includes('Rating not found')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  //eliminar rating
  async removeRating(req, res) {
    console.log("Remove rating endpoint hit!");
    try {
      const { userId, movieId } = req.body;
      if (!userId || !movieId) {
        return res.status(400).json({
          error: 'userId and movieId are required'
        });
      }
      await this.ratingService.removeRating(userId, movieId);
      return res.status(200).json({
        message: 'Rating removed successfully'
      });
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  //verficar si ya fue calificada
  async checkRating(req, res) {
    console.log("Check rating endpoint hit!");
    try {
      const { userId, movieId } = req.params;
      const exists = await this.ratingService.ratingExists(userId, movieId);
      return res.status(200).json({ rated: exists });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default RatingController;
