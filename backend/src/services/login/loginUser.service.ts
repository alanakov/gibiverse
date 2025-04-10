import UserModel from "../../models/UserModel";
import { generateToken } from "../../utils/auth/jwt";

interface LoginUserParams {
  email: string;
  password: string;
}

export const loginUserService = async ({
  email,
  password,
}: LoginUserParams) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) throw new Error("NOT_FOUND");

  const isValidPassword = await user.validarSenha(password);
  if (!isValidPassword) throw new Error("INVALID_CREDENTIALS");

  const token = generateToken({ id: user.id!, email: user.email! });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
    },
  };
};
