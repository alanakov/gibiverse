import { Request, Response } from "express";
import ComicBookModel from "../models/ComicBookModel";
import { paginate } from "../utils/paginate";

export const createComicBook = async (req: Request, res: Response) => {
  try {
    const { title, description, coverUrl, genreId, collectionId, authorId } =
      req.body;
    if (!title || !coverUrl || !genreId || !authorId) {
      return res
        .status(400)
        .json({ error: "Title, coverUrl, genreId, and authorId are required" });
    }

    const comicBook = await ComicBookModel.create({
      title,
      description,
      coverUrl,
      genreId,
      collectionId,
      authorId,
    });
    res.status(201).json(comicBook);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const getAllComicBooks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await paginate({
      model: ComicBookModel,
      page,
      limit,
      order: [["title", "ASC"]],
    });

    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar gibis:", error);
    res.status(500).json({ error: "Erro interno no servidor: " + error });
  }
};

export const getComicBookById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const comicBook = await ComicBookModel.findByPk(req.params.id);
    if (!comicBook) {
      return res.status(404).json({ error: "Comic Book not found" });
    }
    res.json(comicBook);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const updateComicBook = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { title, description, coverUrl, genreId, collectionId, authorId } =
      req.body;
    const comicBook = await ComicBookModel.findByPk(req.params.id);
    if (!comicBook) {
      return res.status(404).json({ error: "Comic Book not found" });
    }

    comicBook.title = title || comicBook.title;
    comicBook.description = description || comicBook.description;
    comicBook.coverUrl = coverUrl || comicBook.coverUrl;
    comicBook.genreId = genreId || comicBook.genreId;
    comicBook.collectionId = collectionId || comicBook.collectionId;
    comicBook.authorId = authorId || comicBook.authorId;

    await comicBook.save();
    res.status(200).json(comicBook);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const destroyComicBookById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const comicBook = await ComicBookModel.findByPk(req.params.id);
    if (!comicBook) {
      return res.status(404).json({ error: "Comic Book not found" });
    }

    await comicBook.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};
