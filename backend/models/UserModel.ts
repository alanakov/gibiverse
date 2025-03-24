import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UserModel extends Model {
  userId: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

UserModel.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
  }
);

export default UserModel;
