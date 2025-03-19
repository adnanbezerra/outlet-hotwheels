import { User } from "../../models/user/index.js";
import bcrypt from "bcrypt";

export async function createUser(userData) {
    const { name, email, password } = userData;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email já está em uso");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
    }
}
