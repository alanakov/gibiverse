import { Request, Response } from "express";
import { createGenreService } from "../../services/genre/createGenre.service";

export const createGenre = async (req: Request, res: Response) => {
  try {
    const genre = await createGenreService(req.body);
    return res.status(201).json(genre);
  } catch (error) {
    if (error instanceof Error && error.message === "MISSING_FIELDS") {
      return res.status(400).json({ error: "Name is required" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
