import { Request, Response } from "express";
import { deleteUserByIdService } from "../../services/user/deleteUserById.service";

export const deleteUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const deleted = await deleteUserByIdService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
