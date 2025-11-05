import { Model, DataTypes } from "sequelize";
import connection from "../src/database/connection.js";


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
