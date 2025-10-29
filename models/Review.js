import { Model, DataTypes } from "sequelize";

class Review extends Model {}

Review.init({}, { sequelize: connection, modelName: "Review", tableName: "reviews", timestamps: true });


export default Review;