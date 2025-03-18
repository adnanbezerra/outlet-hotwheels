import {
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { Image, Text, View } from "react-native";
import { useCart } from "./CartContext";
import { Ionicons } from "@expo/vector-icons";
import { renderStars } from "@/shared/render-stars";
import { formatPrice } from "@/shared/format-price";
import { IProductCard } from "@/interfaces/product-card";
import { router } from "expo-router";

export function ProductCard({ id, title, price, image, stars, onAddToCart }: IProductCard) {
    const { addToCart } = useCart();

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                router.push(`/product/${id}`);
            }}
        >
            <View style={styles.container}>
                <View>
                    <Image
                        source={{ uri: image }}
                        style={{ width: 100, height: 100 }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            addToCart({
                                id,
                                name: title,
                                price,
                                quantity: 1,
                            });
                            onAddToCart();
                        }}
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
                    <Text style={styles.frete}>Frete grátis</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingHorizontal: 40,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        height: "auto",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        maxHeight: 170,
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
        width: 150,
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
