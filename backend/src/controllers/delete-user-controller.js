import { deleteUser } from "../service/user/delete-user.js";

export async function deleteUserController(req, res) {
    const { id } = req.params;

    try {
        const deletedUser = await deleteUser(id);
        res.status(200).json({ message: "Usuário deletado com sucesso", deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}