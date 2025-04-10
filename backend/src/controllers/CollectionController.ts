import { Request, Response } from "express";
import CollectionModel from "../models/CollectionModel";
import { paginate } from "../utils/paginate";

export const getAllCollections = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await paginate({
      model: CollectionModel,
      page,
      limit,
      order: [["name", "ASC"]],
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const getCollectionById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const collection = await CollectionModel.findByPk(req.params.id);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name, description, authorId, coverUrl } = req.body;
    if (!name || !authorId || !coverUrl) {
      return res
        .status(400)
        .json({ error: "Name, authorId and coverUrl are required" });
    }

    const collection = await CollectionModel.create({
      name,
      description,
      authorId,
      coverUrl,
    });
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const updateCollection = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, description, authorId, coverUrl } = req.body;
    const collection = await CollectionModel.findByPk(req.params.id);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    collection.name = name || collection.name;
    collection.description = description || collection.description;
    collection.authorId = authorId || collection.authorId;
    collection.coverUrl = coverUrl || collection.coverUrl;

    await collection.save();
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const destroyCollectionById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const collection = await CollectionModel.findByPk(req.params.id);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    await collection.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};
