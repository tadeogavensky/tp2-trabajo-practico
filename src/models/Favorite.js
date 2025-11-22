import { Model, DataTypes } from "sequelize";
import connection from "../database/connection.js";


class Favorite extends Model {}
Favorite.init(
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
  },
  {
    sequelize: connection,
    modelName: "Favorite",
    tableName: "favorites",
    timestamps: true,

    indexes: [{ fields: ["userId", "movieId"] }, { fields: ["movieId"] }],
  }
);



export default Favorite;
