import { Request, Response } from "express";
import { createCollectionService } from "../../services/collection/createCollection.service";

export const createCollection = async (req: Request, res: Response) => {
  try {
    const collection = await createCollectionService(req.body);
    return res.status(201).json(collection);
  } catch (error) {
    if (error instanceof Error && error.message === "MISSING_FIELDS") {
      return res
        .status(400)
        .json({ error: "Name, authorId and coverUrl are required" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
