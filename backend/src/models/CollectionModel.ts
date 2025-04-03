import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ComicBookModel from "./ComicBookModel";

class CollectionModel extends Model {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  writerId: number | undefined;
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
    writerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
