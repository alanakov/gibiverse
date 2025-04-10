import { Request, Response } from "express";
import { getLoggedUserService } from "../../services/login/getLoggedUser.service";

export const getLoggedUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  try {
    const user = await getLoggedUserService(String(userId));
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
