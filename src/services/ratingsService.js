import { Rating } from "../models/index.js";
import RATING_ERRORS from "../errors/ratings.js";

class RatingService {
    async getRatingsByUser(userId) {
        return await Rating.findAll({ where: { userId } });
    }

    async ratingExists(userId, movieId){
     const rating = await Rating.findOne({ where: { userId, movieId } });
     return !!rating;
   }

    async addRating(userId, movieId, score) {
        const exists = await Rating.findOne({ where: { userId, movieId } });
        if (exists) {
            throw new Error(RATING_ERRORS.MOVIE_ALREADY_RATED);
        }
        const rating = await Rating.create({ userId, movieId, score });
        return rating;
    }

    async updateRating(userId, movieId, score) {
        const rating = await Rating.findOne({ where: { userId, movieId } });
        if (!rating) {
            throw new Error(RATING_ERRORS.RATING_NOT_FOUND);
        }
        rating.score = score;
        await rating.save();
        return rating;
    }

    async removeRating(userId, movieId) {
        const deleted = await Rating.destroy({ where: { userId, movieId } });   
        if (deleted === 0) {
            throw new Error(RATING_ERRORS.RATING_NOT_FOUND);
        }   
    }

}

const ratingService = new RatingService();
export default ratingService
