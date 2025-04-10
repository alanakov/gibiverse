import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { paginate } from "../utils/paginate";
import * as bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Validação de CPF
    if (!cpfValidator.cpf.isValid(cpf)) {
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
      return res.status(409).json({
        error: "Email ou CPF já cadastrado",
      });
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

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
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

    // Exclude the password field from the retrieved data
    result.data = result.data.map((user: any) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
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
    const user = await UserModel.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }, // Não retorna a senha
    });
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
    const usuarioLogado = req.body.usuario.usuario.idUsuario;
    const idUsuarioAtualizar = Number(req.params.id);

    if (usuarioLogado !== idUsuarioAtualizar) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para editar este usuário" });
    }

    const { name, email, cpf, password } = req.body;
    if (!name || !email || !cpf) {
      return res
        .status(400)
        .json({ error: "Nome, email e CPF são obrigatórios" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Validação de CPF
    if (!cpfValidator.cpf.isValid(cpf)) {
      return res.status(400).json({ error: "CPF inválido" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Validação de senha (se foi fornecida)
    if (password) {
      const passwordValidation = UserModel.validarNivelSenha(password);
      if (!passwordValidation.valida) {
        return res.status(400).json({
          error: "Senha muito fraca",
          detalhes: passwordValidation.requisitos,
        });
      }

      // Criptografa a nova senha
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    user.name = name;
    user.email = email;
    user.cpf = cpf;

    await user.save();

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
    });
  } catch (error) {
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
