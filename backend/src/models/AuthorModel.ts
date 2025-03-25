import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import CollectionModel from "./CollectionModel";

class AuthorModel extends Model {
  id: number | undefined;
  name: string | undefined;
  bio: string | undefined;
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
  },
  {
    sequelize,
    modelName: "AuthorModel",
    tableName: "authors",
  }
);

AuthorModel.hasMany(CollectionModel, { foreignKey: "authorId" });
CollectionModel.belongsTo(AuthorModel, { foreignKey: "authorId" });

export default AuthorModel;
