
import { User } from "../../models/user/index.js";

export async function retrieveUser(id) {
    try {
        const user = await User.findById(id).select("-password"); // Exclui a senha da resposta
        return user;
    } catch (error) {
        console.error("Erro ao buscar usuario no banco:", error.message);
        throw new Error("Não foi possível buscar o usuário.");
    }
}
