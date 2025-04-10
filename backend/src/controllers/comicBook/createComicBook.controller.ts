import { Request, Response } from "express";
import { createComicBookService } from "../../services/comicBook/createComicBook.service";

export const createComicBook = async (req: Request, res: Response) => {
  try {
    const comicBook = await createComicBookService(req.body);
    return res.status(201).json(comicBook);
  } catch (error) {
    if (error instanceof Error && error.message === "MISSING_FIELDS") {
      return res.status(400).json({
        error: "Title, coverUrl, genreId, and authorId are required",
      });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
