import { Request, Response } from "express";
import { getAllCollectionsService } from "../../services/collection/getAllCollections.service";

export const getAllCollections = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const collections = await getAllCollectionsService({ page, limit });
    return res.status(200).json(collections);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
