import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user/index.js";

export async function loginUserController(req, res) {
    const { email, password } = req.body;
    console.log("Iniciando login de usuário...");
    console.log("Dados recebidos:", { email });

    try {
        const user = await User.findOne({ email });
        console.log("Usuário encontrado:", user);

        if (!user) {
            console.warn("Usuário não encontrado:", email);
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Senha correta:", passwordMatch);

        if (!passwordMatch) {
            console.warn("Senha incorreta para o usuário:", email);
            return res.status(401).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1y",
        });
        console.log("Token gerado com sucesso:", token);

        const userResponse = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        console.log("Login bem-sucedido para o usuário:", userResponse);

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