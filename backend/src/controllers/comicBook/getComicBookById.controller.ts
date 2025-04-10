import { Request, Response } from "express";
import { getComicBookByIdService } from "../../services/comicBook/getComicBookById.service";

export const getComicBookById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const comicBook = await getComicBookByIdService(req.params.id);
    return res.status(200).json(comicBook);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Comic Book not found" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
