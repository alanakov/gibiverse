import { Request, Response } from "express";
import AuthorModel from "../models/AuthorModel";

export const getAuthorById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const author = await AuthorModel.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      return res.status(400).json({ error: "Name and bio are required" });
    }

    const author = await AuthorModel.create({ name, bio });
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await AuthorModel.findAndCountAll({
      offset,
      limit,
      order: [["name", "ASC"]],
    });

    res.json({
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const updateAuthor = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, bio } = req.body;
    const author = await AuthorModel.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    author.name = name || author.name;
    author.bio = bio || author.bio;

    await author.save();
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const destroyAuthorById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const author = await AuthorModel.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    await author.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};
