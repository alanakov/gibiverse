import { Request, Response } from "express";
import { updateAuthorService } from "../../services/author/updateAuthor.service";

export const updateAuthor = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const updated = await updateAuthorService({
      id: req.params.id,
      ...req.body,
    });

    if (!updated) {
      return res.status(404).json({ error: "Author not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
