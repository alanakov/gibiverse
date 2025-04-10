import { Request, Response } from "express";
import { getAllComicBooksService } from "../../services/comicBook/getAllComicBooks.service";

export const getAllComicBooks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const comicBooks = await getAllComicBooksService({ page, limit });
    return res.status(200).json(comicBooks);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
