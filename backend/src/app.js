import express from "express";
import carrinhoRouter from "./routers/carrinho-router.js";
import orderRouter from "./routers/order-routers.js";
import { UsersRouter } from "./routers/users-routers.js";

const app = express();

app.use(express.json());
app.use("/cart", carrinhoRouter); // Rotas relacionadas ao carrinho
app.use("/orders", orderRouter); // Rotas relacionadas aos pedidos
app.use("/", UsersRouter); // Rotas relacionadas aos usuários

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
