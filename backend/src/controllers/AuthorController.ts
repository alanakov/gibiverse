import { Request, Response } from "express";
import AuthorModel from "../models/AuthorModel";
import { paginate } from "../utils/paginate";
import { getAuthorByIdService } from "../services/author/getAuthorById.service";
import { createAuthorService } from "../services/author/createAuthor.service";
import { getAllAuthorsService } from "../services/author/getAllAuthor.service";
import { updateAuthorService } from "../services/author/updateAuthor.service";
import { deleteAuthorByIdService } from "../services/author/deleteAuthorById.service";

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

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const authors = await getAllAuthorsService({ page, limit });
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

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

export const destroyAuthorById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const deleted = await deleteAuthorByIdService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Author not found" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
