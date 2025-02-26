import 'dotenv/config';
import mongoose from "mongoose";

let connection = null;

const connectDB = async () => {
    if (connection) {
        return connection;
    }

    try {
        connection = await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("Conexão com o MongoDB estabelecida com sucesso");
        return connection;
    } catch (error) {
        console.error("Erro ao conectar com o MongoDB:", error.message);
        process.exit(1);
    }
};

export const mongoConnection = await connectDB();
export default mongoConnection;
