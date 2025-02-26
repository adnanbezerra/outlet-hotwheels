import bcrypt from "bcrypt";
import db from "../database/mongodb.js";

export async function postLogin(req, res) {
    const user = res.locals.user;
    const { token, refreshToken } = res.locals;

    let response = { ...user, token, refreshToken };
    delete response.password;

    res.send(response).status(201);
}

export async function postRegister(req, res) {
    const newRegister = req.body;

    const hashedPassword = bcrypt.hashSync(newRegister.password, 10);

    await db
        .collection("users")
        .insertOne({ ...newRegister, password: hashedPassword });
    res.sendStatus(201);
}
