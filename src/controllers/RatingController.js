class RatingController {
  constructor(ratingService) {
    this.ratingService = ratingService;
  }

  getAllRatings = async (req, res) => {
    console.log("Get ratings endpoint hit!");
    try {
      const ratings = await this.ratingService.getRatingsByUser(req.user.id);
      res.status(200).json(ratings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  addRating = async (req, res) => {
    console.log("Add rating endpoint hit!");
    try {
      const { movieId, score } = req.body;
      if (!movieId || score == null) {
        return res.status(400).json({
          error: "movieId and score are required",
        });
      }

      const rating = await this.ratingService.addRating(
        req.user.id,
        movieId,
        score
      );
      return res.status(201).json({
        message: "Rating added successfully",
        rating,
      });
    } catch (error) {
      if (error.message.includes("already rated")) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  updateRating = async (req, res) => {
    console.log("Update rating endpoint hit!");
    try {
      const { movieId, score } = req.body;
      if (!movieId || score == null) {
        return res.status(400).json({
          error: "movieId and score are required",
        });
      }
      const rating = await this.ratingService.updateRating(
        req.user.id,
        movieId,
        score
      );
      return res.status(200).json({
        message: "Rating updated successfully",
        rating,
      });
    } catch (error) {
      if (error.message.includes("Rating not found")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  //eliminar rating
  removeRating = async (req, res) => {
    console.log("Remove rating endpoint hit!");
    try {
      const { movieId } = req.body;
      if (!movieId) {
        return res.status(400).json({
          error: "movieId is required",
        });
      }
      await this.ratingService.removeRating(req.user.id, movieId);
      return res.status(200).json({
        message: "Rating removed successfully",
      });
    } catch (error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  checkRating = async (req, res) => {
    console.log("Check rating endpoint hit!");
    try {
      const { movieId } = req.params;
      const exists = await this.ratingService.ratingExists(
        req.user.id,
        movieId
      );
      return res.status(200).json({ rated: exists });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default RatingController;
