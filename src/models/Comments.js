

import { Model, DataTypes } from "sequelize";
import connection from "../database/connection.js";

class Comments extends Model { }

Comments.init(
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
    modelName: "Comments",
    tableName: "comments",
    timestamps: true,

    indexes: [{ fields: ["userId", "movieId"] }, { fields: ["movieId"] }],
  }
);

Comments.associate = (models) => {
  // user 
  Comments.belongsTo(models.User, {
    foreignKey: 'userId',
  });

  // movie
  Comments.belongsTo(models.Movie, {
    foreignKey: 'movieId',
    as: 'movie',
  });
};

export default Comments;
