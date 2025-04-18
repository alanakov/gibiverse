import { Request, Response } from "express";
import { deleteComicBookByIdService } from "../../services/comicBook/deleteComicBookById.service";

export const deleteComicBookById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const deleted = await deleteComicBookByIdService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Comic Book not found" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
