import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createGenre } from "../controllers/genre/createGenre.controller";
import { getAllGenres } from "../controllers/genre/getAllGenres.controller";
import { getGenreById } from "../controllers/genre/getGenreById.controller";
import { updateGenre } from "../controllers/genre/updateGenre.controller";
import { deleteGenreById } from "../controllers/genre/deleteGenreById.controller";

const genreRouter = express.Router();

genreRouter.post("/genres", authMiddleware, createGenre);
genreRouter.get("/genres", authMiddleware, getAllGenres);
genreRouter.get("/genres/:id", authMiddleware, getGenreById);
genreRouter.put("/genres/:id", authMiddleware, updateGenre);
genreRouter.delete("/genres/:id", authMiddleware, deleteGenreById);

export default genreRouter;
