import sequelize from '../database/connection.js'

import User from './User.js'
import Movie from './Movie.js'
import Rating from './Rating.js'
import Favorite from './Favorite.js'
import Comment from './Comment.js'
import WatchList from './WatchList.js'

// Users ↔ Ratings
User.hasMany(Rating, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Rating.belongsTo(User, { foreignKey: 'userId' })
Movie.hasMany(Rating, { foreignKey: 'movieId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Rating.belongsTo(Movie, { foreignKey: 'movieId' })

// Users ↔ Favorites
User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Favorite.belongsTo(User, { foreignKey: 'userId' })
Movie.hasMany(Favorite, { foreignKey: 'movieId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Favorite.belongsTo(Movie, { foreignKey: 'movieId' })

// Users ↔ Comment
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Comment.belongsTo(User, { foreignKey: 'userId' })
Movie.hasMany(Comment, { foreignKey: 'movieId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Comment.belongsTo(Movie, { foreignKey: 'movieId' })

// Users ↔ WatchList
User.hasMany(WatchList, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
WatchList.belongsTo(User, { foreignKey: 'userId' })
Movie.hasMany(WatchList, { foreignKey: 'movieId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
WatchList.belongsTo(Movie, { foreignKey: 'movieId' })

export { sequelize, User, Movie, Rating, Favorite, Comment, WatchList }
export default sequelize
