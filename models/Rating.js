import { Model, DataTypes } from "sequelize";
import connection from "../src/database/connection.js";

class Rating extends Model {}

Rating.init(
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
    score: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        min: 0.5,
        max: 5,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Rating",
    tableName: "ratings",
    timestamps: true,
    indexes: [{ fields: ["userId", "movieId"] }, { fields: ["movieId"] }],
  }
);


export default Rating;
