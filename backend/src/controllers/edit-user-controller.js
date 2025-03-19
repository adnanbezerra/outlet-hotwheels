import { editUser } from "../service/user/edit-user.js";

export async function editUserController(req, res) {
    const { id } = req.params;
    const userData = req.body;

    if (!userData) {
        return res.status(422).json({ error: "Dados do usuário são obrigatórios" });
    }

    try {
        const updatedUser = await editUser(id, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
