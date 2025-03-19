import bcrypt from "bcrypt";
import db from "../database/mongodb.js";

export async function postLogin(req, res) {
    try {
        const { token, refreshToken } = res.locals;
        const { _id, name, email } = res.locals.user;

        res.status(200).send({
            id: _id,
            name,
            email,
            token,
            refreshToken,
        });
    } catch (error) {
        res.status(500).send({ message: "Erro ao fazer login", error });
    }
}

export async function postRegister(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .send({ message: "Todos os campos são obrigatórios." });
        }

        const userExists = await db.collection("users").findOne({ email });
        if (userExists) {
            return res.status(409).send({ message: "E-mail já registrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db
            .collection("users")
            .insertOne({ name, email, password: hashedPassword });

        res.status(201).send({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        res.status(500).send({ message: "Erro ao registrar usuário", error });
    }
}
