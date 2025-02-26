import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ProductsRouter } from "./routers/products-router.js";
import { UsersRouter } from "./routers/users-routers.js";
import ProtectedRouter from "./routers/protected-router.js";

dotenv.config();

const PORT = process.env.PORT;

const server = express();

server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));

server.use(cors());
server.use(express.json());

server.use(ProductsRouter);
server.use(UsersRouter);
server.use(ProtectedRouter);

server.listen(PORT, () => {
    console.log(`It's alive on port ${PORT}`);
});
