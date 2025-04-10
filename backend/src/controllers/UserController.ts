import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { paginate } from "../utils/paginate";
import * as bcrypt from "bcrypt";
import { generateToken } from "../utils/auth/jwt";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { Op } from "sequelize";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Validação de CPF
    if (!cpfValidator.isValid(cpf)) {
      return res.status(400).json({ error: "CPF inválido" });
    }

    // Validação de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Validação de força da senha
    const passwordValidation = UserModel.validarNivelSenha(password);
    if (!passwordValidation.valida) {
      return res.status(400).json({
        error: "Senha muito fraca",
        detalhes: passwordValidation.requisitos,
      });
    }

    // Verifica se usuário já existe
    const existingUser = await UserModel.findOne({
      where: {
        [Op.or]: [{ email }, { cpf }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email ou CPF já cadastrado" });
    }

    // Criptografa a senha antes de salvar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      cpf,
    });

    // Gera o token JWT
    const token = generateToken({ id: user.id!, email: user.email! });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await paginate({
      model: UserModel,
      page,
      limit,
      order: [["name", "ASC"]],
    });

    // Exclui o campo de senha dos dados retornados
    result.data = result.data.map((user: any) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json(result);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }, // Não retorna a senha
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, email, cpf } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    if (!name || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.name = name;
    user.email = email;
    if (cpf) user.cpf = cpf;

    await user.save();

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const destroyUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};
