import { Request, Response } from "express";
import GenreModel from "../models/GenreModel";
import { paginate } from "../utils/paginate";

export const getGenreById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const genre = await GenreModel.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await paginate({
      model: GenreModel,
      page,
      limit,
      order: [["name", "ASC"]],
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const genre = await GenreModel.create({ name });
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const updateGenre = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const genre = await GenreModel.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    genre.name = name;
    await genre.save();
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const destroyGenreById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const genre = await GenreModel.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    await genre.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};
