import { DatabaseError, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ComicBookModel extends Model {
  comicBookId: number | undefined;
  title: string | undefined;
  description: string | undefined;
  coverImage: string | undefined;
  collectionId: number | undefined;
  genreId: number | undefined;
}

ComicBookModel.init(
  {
    comicBookId: {
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
    coverImage: {
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
  },
  {
    sequelize,
    modelName: "ComicBookModel",
    tableName: "comic_books",
  }
);

export default ComicBookModel;
