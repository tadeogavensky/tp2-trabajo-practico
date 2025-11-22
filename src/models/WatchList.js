import { Model, DataTypes } from "sequelize";
import connection from "../database/connection.js";


class WatchList extends Model {}

WatchList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
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
