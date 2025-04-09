import express from "express";
import {
  createComicBook,
  destroyComicBookById,
  getAllComicBooks,
  getComicBookById,
  updateComicBook,
} from "../controllers/ComicBookController";
import { authMiddleware } from "../middleware/authMiddleware";

const comicBookRouter = express.Router();

comicBookRouter.post("/comicbooks", authMiddleware, createComicBook);
comicBookRouter.get("/comicbooks", authMiddleware, getAllComicBooks);
comicBookRouter.get("/comicbooks/:id", authMiddleware, getComicBookById);
comicBookRouter.put("/comicbooks/:id", authMiddleware, updateComicBook);
comicBookRouter.delete("/comicbooks/:id", authMiddleware, destroyComicBookById);

export default comicBookRouter;
