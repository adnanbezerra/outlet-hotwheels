import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { mongoConnection } from "../database/mongodb.js";
import { ObjectId } from "mongodb"; 
import { User } from "../models/user/index.js";

dotenv.config();

export async function validatingToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).send("Token não fornecido");
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);

        if (!data || !data.id) {
            return res.status(401).send("Token inválido");
        }

        if (!ObjectId.isValid(data.id)) {
            return res.status(400).send("ID do usuário inválido no token");
        }

        const user = await User.findOne({ _id: new ObjectId(data.id) });

        if (!user) {
            return res.status(404).send("Usuário não encontrado");
        }

        res.locals.user = user;

        next();
    } catch (error) {
        console.error("Erro ao validar token:", error.message);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).send("Token inválido");
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).send("Token expirado");
        }

        return res.status(500).send("Erro interno do servidor");
    }
}
