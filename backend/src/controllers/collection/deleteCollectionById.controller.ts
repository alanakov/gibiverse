import { Request, Response } from "express";
import { deleteCollectionByIdService } from "../../services/collection/deleteCollectionById.service";

export const deleteCollectionById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const deleted = await deleteCollectionByIdService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Collection not found" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
