import { Movie } from "../../models/index.js";

export async function checkMovieExistsByTmdbId(req, res, next){
    try{
        const tmdbId = req.body.tmdbId || req.params.tmdbId;

        if(!tmdbId){
            return res.status(400).json({message: "tmdb requerido"});
        }

        const existingMovie = await Movie.findOne({ where: { tmdbId} })

        if (!existingMovie){
            return res.status(404).json({message: "La película no existe"});
        }

        req.movie = existingMovie;

        next();
    }catch(error){
        res.status(500).json({ error: error.message});
    }
}