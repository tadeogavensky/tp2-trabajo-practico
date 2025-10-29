import { Model, DataTypes } from "sequelize";
import connection from "../database/connection";
class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tmbdId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posterPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    backdropPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    originalLanguage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_fetched_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },

  {
    sequelize: connection,
    modelName: "Movie",
    tableName: "movies",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["tmbdId"],
      },
      {
        fields: ["last_fetched_at"],
      },
    ],
  }
);

export default Movie;
