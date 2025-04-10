import { Request, Response } from "express";
import { getAllAuthorsService } from "../../services/author/getAllAuthors.service";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const authors = await getAllAuthorsService({ page, limit });
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
