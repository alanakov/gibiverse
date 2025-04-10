import { Request, Response } from "express";
import { updateComicBookService } from "../../services/comicBook/updateComicBook.service";

export const updateComicBook = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const updated = await updateComicBookService({
      id: req.params.id,
      ...req.body,
    });

    if (!updated) {
      return res.status(404).json({ error: "Comic Book not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
