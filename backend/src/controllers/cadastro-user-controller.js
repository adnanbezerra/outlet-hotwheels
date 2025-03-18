import { createUser } from "../service/user/create-user.js";

export async function cadastroUser(req, res) {
    try {
        const user = await createUser(req.body);

        // Retornando apenas nome e email, sem o token
        res.status(201).json({
            message: "Usuário registrado com sucesso!",
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
