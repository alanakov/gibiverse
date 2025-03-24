import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class AuthorModel extends Model {
  authorId: number | undefined;
  name: string | undefined;
  bio: string | undefined;
}

AuthorModel.init(
  {
    authorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AuthorModel",
    tableName: "authors",
  }
);

export default AuthorModel;
