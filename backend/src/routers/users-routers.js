import { Router } from "express";
import { cadastroUser } from "../controllers/cadastro-user-controller.js";
import { deleteUserController } from "../controllers/delete-user-controller.js";
import { editUserController } from "../controllers/edit-user-controller.js";
import { loginUserController } from "../controllers/login-user-controller.js";
import { getUserController } from "../controllers/user-controller.js";
import multer from "multer";

export const UsersRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

UsersRouter.post("/user/register", cadastroUser);
UsersRouter.delete("/user/:id", deleteUserController);
UsersRouter.put("/user/:id", editUserController);
UsersRouter.post("/user/login", loginUserController);
UsersRouter.get("/user/:id", getUserController);
UsersRouter.post("/user/:id", upload.single("image"), editUserController);