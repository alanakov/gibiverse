import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

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
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  try {
    const decoded: any = verifyToken(token);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token structure" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Access denied. Invalid token" });
  }
};
