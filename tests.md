# Test Data & Sample Payloads

Valores de referencia para probar el API. Usa los IDs de usuario y token reales que obtengas en `register`/`login`.

## Auth
- Register (POST `/api/users/register`)
```json
{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "age": 28,
  "username": "adal",
  "email": "ada@example.com",
  "password": "Str0ng!Pass"
}
```
- Login (POST `/api/users/login`)
```json
{
  "email": "ada@example.com",
  "password": "Str0ng!Pass",
  "rememberMe": true
}
```

## Movies
- Crear/actualizar (POST `/api/movies`)
```json
{
  "tmdbId": 603,
  "title": "The Matrix",
  "posterPath": "/image-matrix.jpg",
  "backdropPath": "/backdrop-matrix.jpg",
  "releaseDate": "1999-03-31",
  "originalLanguage": "en"
}
```
- Obtener por TMDB id (GET `/api/movies/603`)

## Watchlist (usar `Authorization: Bearer <token>`)
- Agregar (POST `/api/watchlist/603`)
- Listar todo (GET `/api/watchlist/all`)
- Obtener item por movieId (GET `/api/watchlist/603`)
- Reset/clear (DELETE `/api/watchlist/reset`)
- Eliminar item (DELETE `/api/watchlist/603`)

## Favorites
- Agregar (POST `/api/favorites`)
```json
{ "movieId": 603 }
```
- Listar (GET `/api/favorites/user/<userId>`)
- Check uno (GET `/api/favorites/check/<userId>/603`)
- Eliminar (DELETE `/api/favorites`)
```json
{ "movieId": 603 }
```

## Comments
- Crear (POST `/api/movies/<movieId>/comments`)
```json
{ "movieId": 603, "comment": "Mind-blowing sci-fi classic." }
```
- Listar por película (GET `/api/movies/603/comments`)
- Actualizar (PUT `/api/comments/<commentId>`)
```json
{ "comment": "Updated comment text." }
```
- Eliminar (DELETE `/api/comments/<commentId>`)

## Ratings
- Crear (POST `/api/ratings`)
```json
{ "movieId": 603, "score": 4.5 }
```
- Actualizar (PUT `/api/ratings`)
```json
{ "movieId": 603, "score": 5 }
```
- Listar los míos (GET `/api/ratings/user/<userId>`)
- Check si existe (GET `/api/ratings/check/<userId>/603`)
- Eliminar (DELETE `/api/ratings`)
```json
{ "movieId": 603 }
```
