import { Request, Response } from "express";
import { getCollectionByIdService } from "../../services/collection/getCollectionById.service";

export const getCollectionById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const collection = await getCollectionByIdService(req.params.id);
    return res.status(200).json(collection);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Collection not found" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
