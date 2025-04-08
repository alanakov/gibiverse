import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ComicBookModel extends Model {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  coverUrl: string | undefined;
  collectionId: number | undefined;
  genreId: number | undefined;
  authorId: number | undefined;
}

ComicBookModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    coverUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ComicBookModel",
    tableName: "comic_books",
  }
);

export default ComicBookModel;
