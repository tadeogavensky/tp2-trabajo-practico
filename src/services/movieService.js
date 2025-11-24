import { Movie } from "../models/index.js";

class MovieService {
  getMovieByTmdbId = async (tmdbId) => {
    const movie = await Movie.findOne({ where: { tmdbId } });
    return movie;
  };

  createOrUpdateMovie = async (movieData) => {
    let movie = await Movie.findOne({ where: { tmdbId: movieData.tmdbId } });

    let created = false;

    if (movie) {
      await movie.update({
        ...movieData,
        last_fetched_at: new Date(),
      });
    } else {
      movie = await Movie.create({
        ...movieData,
        last_fetched_at: new Date(),
      });
      created = true;
    }

    return [movie, created];
  };

  getMovieById = async (id) => {
    const movie = await Movie.findByPk(id);
    return movie;
  };

  getAllMovies = async () => {
    const movies = await Movie.findAll({
      order: [["createdAt", "DESC"]],
    });
    return movies;
  };
}

export default MovieService;
