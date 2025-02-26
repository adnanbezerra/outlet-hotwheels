import { createUser } from "../service/user/create-user.js";
import jwt from "jsonwebtoken";

export async function cadastroUser(req, res) {
    try {
        const user = await createUser(req.body);

        const token = jwt.sign(
            { id: user._id },          
            process.env.JWT_SECRET,    
            { expiresIn: "1h" }        
        );

        res.status(201).json({
            message: "Usuário registrado com sucesso!",
            user,
            token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
