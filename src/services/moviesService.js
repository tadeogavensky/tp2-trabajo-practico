import { Movie } from "../models/index.js";

class MovieService {

    async getMovieByTmdbId(tmdbId) {
        const movie = await Movie.findOne({ where: { tmdbId } });
        return movie;
    }

    async createOrUpdateMovie(movieData) {
        // 1. Intentar encontrar la película por el campo UNIQUE (tmdbId)
        let movie = await Movie.findOne({ where: { tmdbId: movieData.tmdbId } });

        let created = false;

        if (movie) {
            // 2. Si la encuentra, la actualiza (UPDATE)
            await movie.update({
                ...movieData,
                last_fetched_at: new Date(),
            });

        } else {
            // 3. Si NO la encuentra, la crea (CREATE)
            movie = await Movie.create({
                ...movieData,
                last_fetched_at: new Date(),
            });
            created = true;
        }

        return [movie, created];
    }

    async getMovieById(id) {
        const movie = await Movie.findByPk(id);
        return movie;
    }

    async getAllMovies() {
        const movies = await Movie.findAll({
            order: [['createdAt', 'DESC']] 
        });
        return movies;
    }
}

export default MovieService;
