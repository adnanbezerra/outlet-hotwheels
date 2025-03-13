import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export const renderStars = (rating: number) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
        if (i < Math.floor(rating)) {
            stars.push(
                <Ionicons key={i} name="star" size={24} color="#3483FA" />
            );
        } else if (i < rating) {
            stars.push(
                <Ionicons key={i} name="star-half" size={24} color="#3483FA" />
            );
        } else {
            stars.push(
                <Ionicons
                    key={i}
                    name="star-outline"
                    size={24}
                    color="#3483FA"
                />
            );
        }
    }

    return <View style={{ flexDirection: "row" }}>{stars}</View>;
};
