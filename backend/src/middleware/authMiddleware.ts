import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string }; // Adiciona a propriedade `user` ao tipo Request
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.error("Token não fornecido.");
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  try {
    const decoded: any = verifyToken(token); // Decodifica o token JWT
    console.log("Token decodificado:", decoded); // Log para verificar o token decodificado

    if (!decoded || !decoded.id) {
      console.error("Estrutura do token inválida:", decoded);
      return res.status(401).json({ error: "Invalid token structure" });
    }

    req.user = decoded; // Armazena o usuário decodificado em `req.user`
    next();
  } catch (error) {
    console.error("Erro ao validar o token:", error);
    return res.status(401).json({ error: "Access denied. Invalid token" });
  }
};
