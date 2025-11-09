

    import { Model, DataTypes } from "sequelize";
    import connection from "../src/database/connection.js";

    class Comments extends Model {}
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

    export default Comments;
