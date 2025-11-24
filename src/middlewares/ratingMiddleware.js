import RATING_ERRORS from "../errors/ratings.js";

// Valida body para POST/PUT de ratings
export function validateRatingBody(req, res, next) {
    const { userId, movieId, score } = req.body;

    if (userId == null || movieId == null || score == null) {
        return res.status(400).json({ error: RATING_ERRORS.MISSING_REQUIRED_FIELDS });
    }

    if (typeof userId !== "number" || !Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ error: RATING_ERRORS.INVALID_USER_ID });
    }

    if (typeof movieId !== "number" || !Number.isInteger(movieId) || movieId <= 0) {
        return res.status(400).json({ error: RATING_ERRORS.INVALID_MOVIE_ID });
    }

    if (typeof score !== "number" || !Number.isFinite(score)) {
        return res.status(400).json({ error: RATING_ERRORS.INVALID_SCORE });
    }

    // Rango de score (1-5)
    if (score < 1 || score > 5) {
        return res.status(400).json({ error: RATING_ERRORS.INVALID_SCORE });
    }

    next();
}

// Manejador de errores específico para ratings
export function ratingErrorHandler(err, req, res, next) {
    console.error("Rating error:", err.message);

    if (err.message === RATING_ERRORS.RATING_NOT_FOUND) {
        return res.status(404).json({ error: RATING_ERRORS.RATING_NOT_FOUND });
    }

    if (err.message === RATING_ERRORS.MOVIE_ALREADY_RATED) {
        return res.status(409).json({ error: RATING_ERRORS.MOVIE_ALREADY_RATED });
    }

    if (err.message === RATING_ERRORS.INVALID_SCORE) {
        return res.status(400).json({ error: RATING_ERRORS.INVALID_SCORE });
    }

    return res.status(500).json({ error: "RATING_ERROR" });
}

export default { validateRatingBody, ratingErrorHandler };