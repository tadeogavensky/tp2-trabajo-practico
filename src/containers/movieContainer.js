import MovieService from "../services/MovieService.js";
import MovieController from "../controllers/MovieController.js";

const movieService = new MovieService();
const movieController = new MovieController(movieService);

export { movieService, movieController };