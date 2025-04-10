import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createCollection } from "../controllers/collection/createCollection.controller";
import { getAllCollections } from "../controllers/collection/getAllCollection.controller";
import { getCollectionById } from "../controllers/collection/getCollectionById.controller";
import { updateCollection } from "../controllers/collection/updateCollection.controller";
import { deleteCollectionById } from "../controllers/collection/deleteCollectionById.controller";

const collectionRouter = express.Router();

collectionRouter.post("/collections", authMiddleware, createCollection);
collectionRouter.get("/collections", authMiddleware, getAllCollections);
collectionRouter.get("/collections/:id", authMiddleware, getCollectionById);
collectionRouter.put("/collections/:id", authMiddleware, updateCollection);
collectionRouter.delete(
  "/collections/:id",
  authMiddleware,
  deleteCollectionById
);

export default collectionRouter;
