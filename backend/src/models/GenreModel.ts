import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ComicBookModel from "./ComicBookModel";

class GenreModel extends Model {
  static findByPk(id: any) {
    throw new Error("Method not implemented.");
  }
  id: number | undefined;
  name: string | undefined;
}

GenreModel.init(
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
  },
  {
    sequelize,
    modelName: "GenreModel",
    tableName: "genres",
  }
);

GenreModel.hasMany(ComicBookModel, { foreignKey: "genreId" });
ComicBookModel.belongsTo(GenreModel, { foreignKey: "genreId" });

export default GenreModel;
