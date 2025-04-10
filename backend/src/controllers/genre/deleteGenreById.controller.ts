import { Request, Response } from "express";
import { deleteGenreByIdService } from "../../services/genre/deleteGenreById.service";

export const deleteGenreById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const deleted = await deleteGenreByIdService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Genre not found" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
