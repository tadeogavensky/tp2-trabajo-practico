class MovieController { 
  constructor(movieService) {
    this.movieService = movieService;

    this.getAllMovies = this.getAllMovies.bind(this);
    this.getMovieMetaData = this.getMovieMetaData.bind(this);
    this.createOrUpdateMovie = this.createOrUpdateMovie.bind(this);
  }

  
  createOrUpdateMovie = async (req, res, next) => {
    try {
      const movieData = req.body;

      if (!movieData.tmdbId || !movieData.title) {
        return res.status(400).json({ message: "tmdbId y title son requeridos" });
      }

      const [movie, created] = await this.movieService.createOrUpdateMovie(movieData);

      const status = created ? 201 : 200;

      return res.status(status).json({
        message: created 
          ? "Pelicula guardada exitosamente." 
          : "Pelicula actualizada exitosamente",
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
        return res.status(404).json({ message: "Película no encontrada" });
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
