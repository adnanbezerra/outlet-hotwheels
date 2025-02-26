import { Router } from "express";
import { validatingToken } from "../middlewares/validate-auth.js";

const router = Router();

router.get("/rota-protegida", validatingToken, (req, res) => {
    const user = res.locals.user;
    res.send(`Bem-vindo, ${user.name}!`);
});

export default router;