import express from "express";
import {
  createGenre,
  destroyGenreById,
  getAllGenres,
  getGenreById,
  updateGenre,
} from "../controllers/genreController";
import { authMiddleware } from "../middleware/authMiddleware";

const genreRouter = express.Router();

genreRouter.post("/genres", createGenre);

genreRouter.get("/genres", authMiddleware, getAllGenres);
genreRouter.get("/genres/:id", authMiddleware, getGenreById);
genreRouter.put("/genres/:id", authMiddleware, updateGenre);
genreRouter.delete("/genres/:id", authMiddleware, destroyGenreById);

export default genreRouter;
