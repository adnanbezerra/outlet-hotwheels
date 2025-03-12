import { StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "./CartContext";

export interface IProductCard {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    stars: number;
}

export function ProductCard({
    id,
    title,
    price,
    description,
    image,
    stars,
}: IProductCard) {
    const { addToCart, cart } = useCart();

    console.log(cart);  

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100 }}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addToCart({
                        id,
                        name: title,
                        price,
                        quantity: 1,
                    })}
                >
                    <Text style={styles.buttonText}>
                        <Ionicons
                            name={"cart-outline"}
                            size={24}
                            color="#fff"
                        />
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.informationContainer}>
                <Text style={styles.title}>{title}</Text>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ marginRight: 5, color: "#3483FA" }}>
                        {stars}
                    </Text>
                    {renderStars(stars)}
                </View>
                <Text style={styles.price}>{formatPrice(price)}</Text>
                <Text numberOfLines={3}>{description}</Text>
                <Text style={styles.frete}>Frete grátis</Text>
            </View>
        </View>
    );
}

const renderStars = (rating: number) => {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        height: "auto",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        maxHeight: 210,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        backgroundColor: "#00A884",
        padding: 12,
        borderRadius: 8,
        width: 100,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
    informationContainer: {
        maxWidth: 200,
    },
    price: {
        fontWeight: "bold",
        fontSize: 24,
    },
    frete: {
        color: "#00A884",
        marginTop: 5,
    },
});

const formatPrice = (price: number): string => {
    return (price / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};
