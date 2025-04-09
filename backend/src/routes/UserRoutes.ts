import express from "express";
import {
  createUser,
  destroyUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/UserController";
import { loginUsuario } from "../controllers/LoginController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/users", createUser);
userRouter.post("/login", loginUsuario);

userRouter.get("/users", authMiddleware, getAllUsers);
userRouter.get("/users/:id", authMiddleware, getUserById);
userRouter.put("/users/:id", authMiddleware, updateUser);
userRouter.delete("/users/:id", authMiddleware, destroyUser);

export default userRouter;
