import { Request, Response } from "express";
import { createAuthorService } from "../../services/author/createAuthor.service";

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const author = await createAuthorService(req.body);
    return res.status(201).json(author);
  } catch (error) {
    if (error instanceof Error && error.message === "MISSING_FIELDS") {
      return res
        .status(400)
        .json({ error: "Name, bio and coverUrl are required" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
