import RATING_ERRORS from "../errors/rating.js";

export const validateRatingBody = (req, res, next) => {
  const { movieId, score } = req.body;

  if (movieId == null || score == null) {
    return res
      .status(400)
      .json({ error: RATING_ERRORS.MISSING_REQUIRED_FIELDS });
  }
  const parsedMovieId = Number(movieId);
  const parsedScore = Number(score);

  if (!Number.isInteger(parsedMovieId) || parsedMovieId <= 0) {
    return res.status(400).json({ error: RATING_ERRORS.INVALID_MOVIE_ID });
  }
  if (
    !Number.isFinite(parsedScore) ||
    parsedScore < 1 ||
    parsedScore > 5
  ) {
    return res.status(400).json({ error: RATING_ERRORS.INVALID_SCORE });
  }
  req.body.movieId = parsedMovieId;
  req.body.score = parsedScore;
  next();
};

export const ratingErrorHandler = (err, req, res, next) => {
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
};
