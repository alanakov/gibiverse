import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import UserModel from "../models/UserModel";

export const loginUser = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de e-mail inválido" });
  }

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const validatePassword = await user.validarSenha(senha);

    if (!validatePassword) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = generateToken({ id: user.id!, email: user.email! });

    console.log("Token gerado:", token); // Log para verificar o token gerado

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const getLoggedUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Obtém o ID do usuário do middleware
    console.log("ID do usuário decodificado:", userId); // Log para verificar o ID

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não encontrado" });
    }

    const user = await UserModel.findByPk(userId, {
      attributes: ["id", "name", "email", "cpf"], // Exclui a senha
    });

    if (!user) {
      console.log("Usuário não encontrado no banco de dados."); // Log para verificar a ausência do usuário
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário logado:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};
