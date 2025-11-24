class MovieController {
  constructor(movieService) {
    this.movieService = movieService;
  }

  createOrUpdateMovie = async (req, res, next) => {
    try {
      const movieData = req.body;

      if (!movieData.tmdbId || !movieData.title) {
        return res
          .status(400)
          .json({ message: "tmdbId and title are required" });
      }

      const [movie, created] = await this.movieService.createOrUpdateMovie(
        movieData
      );

      const status = created ? 201 : 200;

      return res.status(status).json({
        message: created
          ? "Movie saved successfully."
          : "Movie updated successfully",
        movie,
      });
    } catch (error) {
      next(error);
    }
  };

  getMovieMetaData = async (req, res, next) => {
    try {
      const { tmdbId } = req.params;

      const movie = await this.movieService.getMovieByTmdbId(tmdbId);

      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      return res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  };

  getAllMovies = async (req, res, next) => {
    try {
      console.log("Fetching all movies... 🍿");

      const movies = await this.movieService.getAllMovies();

      return res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  };
}

export default MovieController;
