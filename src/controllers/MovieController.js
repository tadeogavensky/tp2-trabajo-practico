import MovieService from "../services/moviesService.js";

const movieService = new MovieService();

class MovieController { 

  constructor(movieService) {
        this.movieService = movieService;
        if (this.getAllMovies) {
             this.getAllMovies = this.getAllMovies.bind(this);
        }

        if (this.getMovieMetadata) { // 🚨 Si este método NO existe, falla aquí.
             this.getMovieMetadata = this.getMovieMetadata.bind(this);
        }
        
        if (this.createOrUpdateMovie) {
             this.createOrUpdateMovie = this.createOrUpdateMovie.bind(this);
        }
    }

    async createOrUpdateMovie (req, res, next){
      try {
        const movieData = req.body;

        if (!movieData.tmdbId || !movieData.title){
          return res.status(400).json({message: "tmdbId y title son requeridos"})
        }

        const [movie, created] = await movieService.createOrUpdateMovie(movieData);

        const status = created ? 201 : 200;

        return res.status(status).json({
          message: created ? "Pelicula guardada exitosamente." : "Pelicula actualizada exitosamente",
          movie: movie,
        });
      } catch (error) {
          next(error);
      }
    }

    async getMovieMetaData(req, res, next){
      try{
        const {tmdbId} = req.params;

        const movie = await movieService.getMovieByTmdbId(tmdbId);

        if (!movie){
          return res.status(404).json({ message: "Película no encontrada"})
        }

        return res.status(200).json(movie);
      } catch (error){
          next(error);
      }
    }

    async getAllMovies(req, res, next) {
        try {
            console.log("Fetching all movies... 🍿");
            
            const movies = await this.movieService.getAllMovies();

            return res.status(200).json(movies);
        } catch (error) {
            next(error);
        }
    }

}

export default new MovieController(movieService);
