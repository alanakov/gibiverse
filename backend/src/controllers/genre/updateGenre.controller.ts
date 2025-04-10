import { Request, Response } from "express";
import { updateGenreService } from "../../services/genre/updateGenre.service";

export const updateGenre = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const updated = await updateGenreService({
      id: req.params.id,
      ...req.body,
    });

    if (!updated) {
      return res.status(404).json({ error: "Genre not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
