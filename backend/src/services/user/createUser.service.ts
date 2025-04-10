import UserModel from "../../models/UserModel";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/auth/jwt";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export const createUserService = async ({
  name,
  email,
  password,
  cpf,
}: CreateUserInput) => {
  validateRequiredFields({ name, email, password, cpf });
  validateCpf(cpf);
  validateEmailFormat(email);
  validatePasswordStrength(password);

  await checkUserExistence({ email, cpf });

  const hashedPassword = await hashPassword(password);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    cpf,
  });

  const token = generateToken({ id: user.id!, email: user.email! });

  return formatUserResponse(user, token);
};

const validateRequiredFields = ({
  name,
  email,
  password,
  cpf,
}: CreateUserInput) => {
  if (!name || !email || !password || !cpf) throw new Error("MISSING_FIELDS");
};

const validateCpf = (cpf: string) => {
  if (!cpfValidator.isValid(cpf)) throw new Error("INVALID_CPF");
};

const validateEmailFormat = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) throw new Error("INVALID_EMAIL");
};

const validatePasswordStrength = (password: string) => {
  const validation = UserModel.validarNivelSenha(password);
  if (!validation.valida) {
    const error: any = new Error("WEAK_PASSWORD");
    error.details = validation.requisitos;
    throw error;
  }
};

const checkUserExistence = async ({
  email,
  cpf,
}: {
  email: string;
  cpf: string;
}) => {
  const existing = await UserModel.findOne({
    where: { [Op.or]: [{ email }, { cpf }] },
  });
  if (existing) throw new Error("USER_ALREADY_EXISTS");
};

const hashPassword = (password: string) => bcrypt.hash(password, 10);

const formatUserResponse = (user: any, token: string) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  token,
});
