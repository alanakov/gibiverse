import { Request, Response } from "express";
import { getAuthorByIdService } from "../../services/genre/getGenreById.service";

export const getAuthorById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const author = await getAuthorByIdService(req.params.id);
    return res.status(200).json(author);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Author not found" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
