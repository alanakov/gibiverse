import express from "express";
import {
  createCollection,
  destroyCollectionById,
  getAllCollections,
  getCollectionById,
  updateCollection,
} from "../controllers/CollectionController";
import { authMiddleware } from "../middleware/authMiddleware";

const collectionRouter = express.Router();

// collectionRouter.post("/collections", authMiddleware, createCollection);
// collectionRouter.get("/collections", authMiddleware, getAllCollections);
// collectionRouter.get("/collections/:id", authMiddleware, getCollectionById);
// collectionRouter.put("/collections/:id", authMiddleware, updateCollection);
// collectionRouter.delete(
//   "/collections/:id",
//   authMiddleware,
//   destroyCollectionById
// );
collectionRouter.post("/collections", createCollection);
collectionRouter.get("/collections", getAllCollections);
collectionRouter.get("/collections/:id", getCollectionById);
collectionRouter.put("/collections/:id", updateCollection);
collectionRouter.delete(
  "/collections/:id",

  destroyCollectionById
);

export default collectionRouter;
