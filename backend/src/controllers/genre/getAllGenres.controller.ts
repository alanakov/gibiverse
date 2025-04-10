import { Request, Response } from "express";
import { getAllGenresService } from "../../services/genre/getAllGenres.service";

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const genres = await getAllGenresService({ page, limit });
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
