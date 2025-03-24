import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class GenreModel extends Model {
  genreId: number | undefined;
  name: string | undefined;
}

GenreModel.init(
  {
    genreId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "GenreModel",
    tableName: "genres",
  }
);

export default GenreModel;
