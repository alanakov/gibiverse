import { Request, Response } from "express";
import { deleteAuthorByIdService } from "../../services/author/deleteAuthorById.service";

export const deleteAuthorById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const deleted = await deleteAuthorByIdService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Author not found" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
