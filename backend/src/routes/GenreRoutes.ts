import express from "express";
import { listGenres } from "../controllers/GenreController";
import {
  createGenre,
  destroyGenreById,
  getAllGenres,
  getGenreById,
  updateGenre,
} from "../controllers/GenreController";
import { authMiddleware } from "../middleware/authMiddleware";

const genreRouter = express.Router();

// genreRouter.post("/genres", authMiddleware, createGenre);
// genreRouter.get("/genres", authMiddleware, getAllGenres);
// genreRouter.get("/genres/:id", authMiddleware, getGenreById);
// genreRouter.put("/genres/:id", authMiddleware, updateGenre);
// genreRouter.delete("/genres/:id", authMiddleware, destroyGenreById);
genreRouter.post("/genres", createGenre);
genreRouter.get("/genres", getAllGenres);
genreRouter.get("/genres/:id", getGenreById);
genreRouter.put("/genres/:id", updateGenre);
genreRouter.delete("/genres/:id", destroyGenreById);

export default genreRouter;
