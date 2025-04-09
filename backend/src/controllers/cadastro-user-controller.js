import { createUser } from "../service/user/create-user.js";

export async function cadastroUser(req, res) {
    console.log("Iniciando cadastro de novo usuário:");
    console.log("Dados recebidos:", req.body);

    try {
        const user = await createUser(req.body);
        console.log("Usuário criado com sucesso:", {
            name: user.name,
            email: user.email,
        });

        res.status(201).json({
            message: "Usuário registrado com sucesso!",
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error.message);
        res.status(400).json({ error: error.message });
    }
}