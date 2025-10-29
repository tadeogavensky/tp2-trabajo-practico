import { Model, DataTypes } from "sequelize";
import connection from "../database/connection";
import User from "./User";
import Movie from "./Movie";

class WatchList extends Model {}

WatchList.init(
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
    modelName: "WatchList",
    tableName: "watchlists",
    timestamps: true,

    indexes: [{ fields: ["userId", "movieId"] }, { fields: ["movieId"] }],
  }
);



export default WatchList;
