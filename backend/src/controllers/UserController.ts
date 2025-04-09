import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { paginate } from "../utils/paginate";
import * as bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt"; // Importa a função para gerar o token

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }
    // Verifica se o usuário já existe
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email já está em uso" });
    }

    // Criptografa a senha antes de salvar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Gera o token JWT
    const token = generateToken({ id: user.id!, email: user.email! });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      // Não retornar a senha, mesmo criptografada
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
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

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const usuarioLogado = req.user?.id;
    const idUsuarioAtualizar = Number(req.params.id);

    if (usuarioLogado !== idUsuarioAtualizar) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para editar este usuário" });
    }

    const { name, email, cpf } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    const user = await UserModel.findByPk(req.params.id);
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
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
};
