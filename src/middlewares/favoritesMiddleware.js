import FAVORITE_ERRORS from "../errors/favorite.js";

export const validateFavoriteBody = (req, res, next) => {
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).json({
      error: FAVORITE_ERRORS.MISSING_REQUIRED_FIELDS,
    });
  }

  if (isNaN(movieId) || parseInt(movieId, 10) <= 0) {
    return res.status(400).json({
      error: FAVORITE_ERRORS.INVALID_MOVIE_ID,
    });
  }

  req.body.movieId = parseInt(movieId, 10);

  next();
};



export const validateCheckFavoriteParams = (req, res, next) => {
  const { movieId } = req.params;

  if (!movieId) {
    return res.status(400).json({
      error: FAVORITE_ERRORS.MISSING_REQUIRED_FIELDS,
    });
  }

  if (isNaN(movieId) || parseInt(movieId, 10) <= 0) {
    return res.status(400).json({
      error: FAVORITE_ERRORS.INVALID_MOVIE_ID,
    });
  }

  req.params.userId = parseInt(userId, 10);
  req.params.movieId = parseInt(movieId, 10);

  next();
};

export const favoriteErrorHandler = (err, req, res, next) => {
  console.error("Favorite error:", err.message);

  if (err.message === FAVORITE_ERRORS.FAVORITE_NOT_FOUND) {
    return res.status(404).json({ error: FAVORITE_ERRORS.FAVORITE_NOT_FOUND });
  }

  if (err.message === FAVORITE_ERRORS.MOVIE_ALREADY_IN_FAVORITES) {
    return res
      .status(409)
      .json({ error: FAVORITE_ERRORS.MOVIE_ALREADY_IN_FAVORITES });
  }

  return res.status(500).json({ error: "FAVORITE_ERROR" });
};
