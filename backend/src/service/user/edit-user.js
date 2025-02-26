import { User } from "../../models/user/index.js";

async function saveImage(name, file) {
    if (!file) {
        return null;
    }

    const newImage = new Image({
        name,
        img: {
            data: file.buffer,
            contentType: file.mimetype,
        },
    });

    return await newImage.save();
}
export async function editUser(userId, userData) {
    try {
        const user = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    } catch (error) {
        console.error("Erro ao editar usuário:", error);
        throw error;
    }
}