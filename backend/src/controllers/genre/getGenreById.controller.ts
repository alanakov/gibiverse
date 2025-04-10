import { Request, Response } from "express";
import { getGenreByIdService } from "../../services/author/getAuthorById.service";

export const getGenreById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const genre = await getGenreByIdService(req.params.id);
    return res.status(200).json(genre);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Genre not found" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
