import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createComicBook } from "../controllers/comicBook/createComicBook.controller";
import { getAllComicBooks } from "../controllers/comicBook/getAllComicBooks.controller";
import { getComicBookById } from "../controllers/comicBook/getComicBookById.controller";
import { updateComicBook } from "../controllers/comicBook/updateComicBook.controller";
import { deleteComicBookById } from "../controllers/comicBook/deleteComicBookById.controller";

const comicBookRouter = express.Router();

comicBookRouter.post("/comicbooks", authMiddleware, createComicBook);
comicBookRouter.get("/comicbooks", authMiddleware, getAllComicBooks);
comicBookRouter.get("/comicbooks/:id", authMiddleware, getComicBookById);
comicBookRouter.put("/comicbooks/:id", authMiddleware, updateComicBook);
comicBookRouter.delete("/comicbooks/:id", authMiddleware, deleteComicBookById);

export default comicBookRouter;
