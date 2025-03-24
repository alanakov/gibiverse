import { DatabaseError, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ComicBookModel extends Model {}

ComicBookModel.init(
  {
    comicBookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
