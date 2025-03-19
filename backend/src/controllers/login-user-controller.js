import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user/index.js";

export async function loginUserController(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1m",
        });

        const userResponse = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        return res
            .status(200)
            .json({ message: "Login bem-sucedido", user: userResponse, token });
    } catch (error) {
        console.error("Erro no login:", error);
        return res
            .status(500)
            .json({
                error: "Erro interno no servidor. Tente novamente mais tarde.",
            });
    }
}
