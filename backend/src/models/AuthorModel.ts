import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ComicBookModel from "./ComicBookModel";

class AuthorModel extends Model {
  id: number | undefined;
  name: string | undefined;
  bio: string | undefined;
  coverUrl: string | undefined;
}

AuthorModel.init(
  {
    id: {
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
    coverUrl: {
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

AuthorModel.hasMany(ComicBookModel, { foreignKey: "authorId" });
ComicBookModel.belongsTo(AuthorModel, { foreignKey: "authorId" });

export default AuthorModel;
