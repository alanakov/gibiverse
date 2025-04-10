import { Request, Response } from "express";
import { getUserByIdService } from "../../services/user/getUserById.service";

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await getUserByIdService(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
