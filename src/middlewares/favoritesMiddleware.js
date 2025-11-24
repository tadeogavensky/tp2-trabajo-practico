import FAVORITE_ERRORS from "../errors/favorites.js";

// Validar body para agregar/eliminar favoritos (POST y DELETE)
export function validateFavoriteBody(req, res, next) {
    const { userId, movieId } = req.body;
    
    // Verificar que existan
    if (!userId || !movieId) {
        return res.status(400).json({ 
            error: FAVORITE_ERRORS.MISSING_REQUIRED_FIELDS 
        });
    }
    
    // Verificar que sean números
    if (isNaN(userId) || parseInt(userId) <= 0) {
        return res.status(400).json({ 
            error: FAVORITE_ERRORS.INVALID_USER_ID 
        });
    }
    
    if (isNaN(movieId) || parseInt(movieId) <= 0) {
        return res.status(400).json({ 
            error: FAVORITE_ERRORS.INVALID_MOVIE_ID 
        });
    }
    
    // Convertir a números enteros
    req.body.userId = parseInt(userId);
    req.body.movieId = parseInt(movieId);
    
    next();
}

// Validar params para obtener favoritos de un usuario
export function validateUserIdParam(req, res, next) {
    const { userId } = req.params;
    
    if (!userId || isNaN(userId) || parseInt(userId) <= 0) {
        return res.status(400).json({ 
            error: FAVORITE_ERRORS.INVALID_USER_ID 
        });
    }
    
    req.params.userId = parseInt(userId);
    next();
}

// Validar params para verificar si es favorito (check)
export function validateCheckFavoriteParams(req, res, next) {
    const { userId, movieId } = req.params;
    
    // Verificar que existan
    if (!userId || !movieId) {
        return res.status(400).json({ 
            error: FAVORITE_ERRORS.MISSING_REQUIRED_FIELDS 
        });
    }
    
    // Validar userId
    if (isNaN(userId) || parseInt(userId) <= 0) {
        return res.status(400).json({ 
            error: FAVORITE_ERRORS.INVALID_USER_ID 
        });
    }
    
    // Validar movieId
    if (isNaN(movieId) || parseInt(movieId) <= 0) {
        return res.status(400).json({ 
            error: FAVORITE_ERRORS.INVALID_MOVIE_ID 
        });
    }
    
    // Convertir y guardar
    req.params.userId = parseInt(userId);
    req.params.movieId = parseInt(movieId);
    
    next();
}

// Manejador de errores específico para favorites
export function favoriteErrorHandler(err, req, res, next) {
    console.error("Favorite error:", err.message);
    
    if (err.message === FAVORITE_ERRORS.FAVORITE_NOT_FOUND) {
        return res.status(404).json({ error: FAVORITE_ERRORS.FAVORITE_NOT_FOUND });
    }
    
    if (err.message === FAVORITE_ERRORS.MOVIE_ALREADY_IN_FAVORITES) {
        return res.status(409).json({ error: FAVORITE_ERRORS.MOVIE_ALREADY_IN_FAVORITES });
    }
    
    return res.status(500).json({ error: "FAVORITE_ERROR" });
}
