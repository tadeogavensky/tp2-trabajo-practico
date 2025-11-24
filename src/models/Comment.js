

import { Model, DataTypes } from "sequelize";
import connection from "../database/connection.js";

class Comment extends Model { }

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 1000],
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true,

    indexes: [{ fields: ["userId", "movieId"] }, { fields: ["movieId"] }],
  }
);

Comment.associate = (models) => {
  // user 
  Comment.belongsTo(models.User, {
    foreignKey: 'userId',
  });

  // movie
  Comment.belongsTo(models.Movie, {
    foreignKey: 'movieId',
    as: 'movie',
  });
};

export default Comment;
