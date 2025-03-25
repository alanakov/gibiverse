import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, cpf, password } = req.body;
    if (!name || !email || !cpf || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const user = await UserModel.create({ name, email, document, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, cpf, password } = req.body;
    if (!name || !email || !cpf || !password) {
      return res
        .status(400)
        .json({ error: "Name, email and cpf are required" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.cpf = cpf;
    if (password) {
      user.password = password;
    }
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
};
