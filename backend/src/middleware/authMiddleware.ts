import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth/jwt";
import { extractTokenFromHeader } from "../utils/auth/extractToken";
import { isValidDecodedToken } from "../utils/auth/validateDecodedToken";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractTokenFromHeader(req.header("Authorization"));

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Token ausente ou malformado." });
  }

  try {
    const decoded = verifyToken(token);

    if (!isValidDecodedToken(decoded)) {
      return res.status(401).json({ error: "Token inválido." });
    }

    req.user = decoded;
    next();
  } catch {
    return res
      .status(401)
      .json({ error: "Acesso negado. Falha na autenticação." });
  }
};
