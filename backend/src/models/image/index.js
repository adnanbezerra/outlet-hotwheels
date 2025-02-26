import { mongoConnection } from "../../database/mongodb.js";

const imageSchema = new mongoConnection.Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String,
    },
});

export const Image = mongoConnection.model("Image", imageSchema);
