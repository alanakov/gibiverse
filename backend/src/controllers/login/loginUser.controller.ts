import { Request, Response } from "express";
import { loginUserService } from "../../services/login/loginUser.service";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de e-mail inválido" });
  }

  try {
    const result = await loginUserService({ email, password });
    return res.status(200).json({
      message: "Login realizado com sucesso",
      ...result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      if (error.message === "INVALID_CREDENTIALS") {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
