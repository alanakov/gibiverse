import express from "express";

import { authMiddleware } from "../middleware/authMiddleware";
import { createUser } from "../controllers/user/createUser.controller";
import { getAllUsers } from "../controllers/user/getAllUser.controller";
import { getUserById } from "../controllers/user/getUserById.controller";
import { updateUser } from "../controllers/user/updateUser.controller";
import { deleteUserById } from "../controllers/user/deleteUserById.controller";
import { loginUser } from "../controllers/login/loginUser.controller";
import { getLoggedUser } from "../controllers/login/getLoggedUser.controller";

const userRouter = express.Router();

userRouter.post("/users", createUser);
userRouter.post("/login", loginUser);

userRouter.get("/users/me", authMiddleware, getLoggedUser);
userRouter.get("/users", authMiddleware, getAllUsers);
userRouter.get("/users/:id", authMiddleware, getUserById);
userRouter.put("/users/:id", authMiddleware, updateUser);
userRouter.delete("/users/:id", authMiddleware, deleteUserById);

export default userRouter;
