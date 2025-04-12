import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ProductsRouter } from "./routers/products-router.js";
import { UsersRouter } from "./routers/users-routers.js";
import ProtectedRouter from "./routers/protected-router.js";
import OrderRouter from "./routers/order-routers.js";
import carrinhoRouter from "./routers/carrinho-router.js";
import http from "http";
import { WebSocketServer } from "ws";
import AIRouter from "./routers/ai-routes.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const server = http.createServer(app);
const ws = new WebSocketServer({ server });

ws.on("connection", (client) => {
    clients.add(client);
    console.log("Client connected");
    client.on("message", (message) => {
        const parsedMessage = message.toString();

        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(parsedMessage);
            }
        }
    });

    client.on("close", () => {
        clients.delete(client);
        console.log("Client disconnected");
    });
});

const clients = new Set();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(express.json());

app.use(ProductsRouter);
app.use(UsersRouter);
app.use(ProtectedRouter);
app.use(OrderRouter);
app.use(carrinhoRouter);
app.use(AIRouter);

server.listen(PORT, () => {
    console.log(`It's alive on port ${PORT}`);
});
