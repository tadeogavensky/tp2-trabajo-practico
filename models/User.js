import { DataTypes, Model } from "sequelize";
import connection from "../src/database/connection.js";

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    /*     // Sugiero remover la edad y el username, no esta en el frontend
age: {      
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 120,
      },
    }, 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },*/
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default User;
