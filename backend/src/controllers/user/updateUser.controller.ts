import { Request, Response } from "express";
import { updateUserService } from "../../services/user/updateUser.service";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const updatedUser = await updateUserService({
      id: userId,
      ...req.body,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "MISSING_FIELDS") {
        return res.status(400).json({ error: "Nome e email são obrigatórios" });
      }

      if (error.message === "NOT_FOUND") {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
    }

    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
