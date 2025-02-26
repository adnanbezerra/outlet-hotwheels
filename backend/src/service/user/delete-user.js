import { User } from "../../models/user/index.js";

export async function deleteUser(userId) {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        throw error;
    }
}