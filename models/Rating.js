import { Model, DataTypes } from "sequelize";
import connection from "../database/connection";

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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0.5,
        max: 5,
      },
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
    modelName: "Rating",
    tableName: "ratings",
    timestamps: true,
    indexes: [{ fields: ["userId", "movieId"] }, { fields: ["movieId"] }],
  }
);

Rating.belongsTo(sequelize.models.User, { foreignKey: "userId" });
Rating.belongsTo(sequelize.models.Movie, { foreignKey: "movieId" });

export default Rating;
