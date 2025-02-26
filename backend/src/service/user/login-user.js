import { User } from "../../models/user/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginUser(email, password) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Senha incorreta");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { user, token };
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
    }
}