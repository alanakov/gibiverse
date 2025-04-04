import express from "express";
import {
  createAuthor,
  destroyAuthorById,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "../controllers/AuthorController";
import { authMiddleware } from "../middleware/authMiddleware";

const authorRouter = express.Router();

authorRouter.post("/authors", createAuthor);

// authorRouter.get("/authors", authMiddleware, getAllAuthors);
// authorRouter.get("/authors/:id", authMiddleware, getAuthorById);
// authorRouter.put("/authors/:id", authMiddleware, updateAuthor);
// authorRouter.delete("/authors/:id", authMiddleware, destroyAuthorById);
authorRouter.get("/authors", getAllAuthors);
authorRouter.get("/authors/:id", getAuthorById);
authorRouter.put("/authors/:id", updateAuthor);
authorRouter.delete("/authors/:id", destroyAuthorById);

export default authorRouter;
