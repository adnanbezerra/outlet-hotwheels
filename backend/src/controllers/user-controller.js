import { retrieveUser } from "../service/user/retrieve-user.js";
import { User } from "../models/user/index.js";

export async function getUserController(req, res) {
    try {
        const { id } = req.params;
        const user = await retrieveUser(id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao recuperar usuário:", error.message);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao recuperar usuários:", error.message);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
}

export async function getUserMe(req, res) {
    const { user } = res.locals;

    return res.status(200).json(user);
}
