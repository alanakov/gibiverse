import express from "express";

import { authMiddleware } from "../middleware/authMiddleware";
import { createAuthor } from "../controllers/author/createAuthor.controller";
import { getAllAuthors } from "../controllers/author/getAllAuthor.controller";
import { getAuthorById } from "../controllers/author/getAuthorById.controller";
import { updateAuthor } from "../controllers/author/updateAuthor.controller";
import { deleteAuthorById } from "../controllers/author/deleteAuthorById.controller";

const authorRouter = express.Router();

authorRouter.post("/authors", createAuthor);

authorRouter.get("/authors", authMiddleware, getAllAuthors);
authorRouter.get("/authors/:id", authMiddleware, getAuthorById);
authorRouter.put("/authors/:id", authMiddleware, updateAuthor);
authorRouter.delete("/authors/:id", authMiddleware, deleteAuthorById);

export default authorRouter;
