import { Request, Response } from "express";
import CollectionModel from "../models/CollectionModel";

export const getAllCollections = async (req: Request, res: Response) => {
  try {
    const collections = await CollectionModel.findAll();
    res.json(collections);
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
    const { name, description, writerId } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const collection = await CollectionModel.create({
      name,
      description,
      writerId,
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
    const { name, description, writerId } = req.body;
    const collection = await CollectionModel.findByPk(req.params.id);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    collection.name = name || collection.name;
    collection.description = description || collection.description;
    collection.writerId = writerId || collection.writerId;

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
