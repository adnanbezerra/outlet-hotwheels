import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "@/components/CartContext";

const ShoppingCart = () => {
    const { cart } = useCart();
    const router = useRouter();

    const cartItems = [
        // Exemplo de itens no carrinho
        { id: "1", name: "Hot Wheels Car 1", price: 10 },
    ];

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>R$ {item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrinho de Compras</Text>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => router.replace("/checkout")}
            >
                <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#1D3D47",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#F8DA2F",
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F8DA2F",
    },
    itemName: {
        fontSize: 18,
        color: "#fff",
    },
    itemPrice: {
        fontSize: 18,
        color: "#fff",
    },
    checkoutButton: {
        backgroundColor: "#CE3E2F",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    checkoutButtonText: {
        fontSize: 18,
        color: "#fff",
    },
});

export default ShoppingCart;
