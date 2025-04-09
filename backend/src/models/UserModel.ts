import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";

class UserModel extends Model {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  cpf: string | undefined;
  password: string | undefined;

  public async hashSenha() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validarSenha(senha: string): Promise<boolean> {
    return await bcrypt.compare(senha, this.password!);
  }

  public static validarNivelSenha(senha: string) {
    const requisitos = {
      temMaiuscula: /[A-Z]/.test(senha),
      temMinuscula: /[a-z]/.test(senha),
      temNumero: /[0-9]/.test(senha),
      temEspecial: /[!@#$%&*°?]/.test(senha),
      tamanhoMinimo: senha.length >= 8,
    };

    const valida = Object.values(requisitos).every(Boolean);

    return {
      valida,
      requisitos,
      mensagem: valida
        ? "Senha válida"
        : "Senha não atende aos requisitos mínimos",
    };
  }
}

UserModel.init(
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
