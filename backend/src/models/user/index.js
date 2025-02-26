import mongoose from "mongoose"; // Importando o mongoose diretamente

// Definindo o schema de usuário
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true } // Adiciona automaticamente campos de createdAt e updatedAt
);

// Criando o modelo com o mongoose
export const User = mongoose.model("User", userSchema);
