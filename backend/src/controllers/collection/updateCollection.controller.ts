import { Request, Response } from "express";
import { updateCollectionService } from "../../services/collection/updateCollection.service";

export const updateCollection = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const updated = await updateCollectionService({
      id: req.params.id,
      data: req.body,
    });

    if (!updated) {
      return res.status(404).json({ error: "Collection not found" });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
