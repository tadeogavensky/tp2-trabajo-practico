import { movieService } from "../containers/movieContainer";
import MOVIE_ERRORS from "../errors/movie";

export const checkMovieExistsByTmdbId = async (req, res, next) => {
  try {
    const tmdbId = req.body.tmdbId || req.params.tmdbId;

    if (!tmdbId) {
      return res.status(400).json({ message: MOVIE_ERRORS.TMDB_ID_REQUIRED });
    }

    const existingMovie = await movieService.getMovieById(tmdbId);

    if (!existingMovie) {
      return res.status(404).json({ message: MOVIE_ERRORS.MOVIE_NOT_FOUND });
    }

    req.movie = existingMovie;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
