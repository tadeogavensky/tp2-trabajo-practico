import { Model, DataTypes } from "sequelize";
import connection from "../database/connection";

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
  }
);

WatchList.belongsTo(connection.models.User, { foreignKey: "userId" });
WatchList.belongsTo(connection.models.Movie, { foreignKey: "movieId" });

export default WatchList;
