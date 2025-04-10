import { Request, Response } from "express";
import { getAllUsersService } from "../../services/user/getAllUser.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const users = await getAllUsersService({ page, limit });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
