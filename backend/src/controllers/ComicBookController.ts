import { Request, Response } from "express";
import ComicBookModel from "../models/ComicBookModel";

export const getAllComicBooks = async (req: Request, res: Response) => {
  try {
    const comicBooks = await ComicBookModel.findAll();
    res.json(comicBooks);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
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

export const createComicBook = async (req: Request, res: Response) => {
  try {
    const { title, description, coverImage, genreId, collectionId } = req.body;
    if (!title || !coverImage || !genreId) {
      return res
        .status(400)
        .json({ error: "Title, coverImage, and genreId are required" });
    }

    const comicBook = await ComicBookModel.create({
      title,
      description,
      coverImage,
      genreId,
      collectionId,
    });
    res.status(201).json(comicBook);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const updateComicBook = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { title, description, coverImage, genreId, collectionId } = req.body;
    const comicBook = await ComicBookModel.findByPk(req.params.id);
    if (!comicBook) {
      return res.status(404).json({ error: "Comic Book not found" });
    }

    comicBook.title = title || comicBook.title;
    comicBook.description = description || comicBook.description;
    comicBook.coverImage = coverImage || comicBook.coverImage;
    comicBook.genreId = genreId || comicBook.genreId;
    comicBook.collectionId = collectionId || comicBook.collectionId;

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
