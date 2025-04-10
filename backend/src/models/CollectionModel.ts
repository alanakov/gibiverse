import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ComicBookModel from "./ComicBookModel";

class CollectionModel extends Model {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  coverUrl: string | undefined;
  authorId: number | undefined;
}

CollectionModel.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    coverUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CollectionModel",
    tableName: "collections",
  }
);

CollectionModel.hasMany(ComicBookModel, { foreignKey: "collectionId" });
ComicBookModel.belongsTo(CollectionModel, { foreignKey: "collectionId" });

export default CollectionModel;
