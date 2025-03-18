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
import { formatPrice } from "@/shared/format-price";

const ShoppingCart = () => {
    const { cart, removeFromCart } = useCart(); // Use o estado global do carrinho
    const router = useRouter();

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)} // Permite remover itens do carrinho
            >
                <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrinho de Compras</Text>
            {cart.length === 0 ? (
                <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
            ) : (
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
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
    emptyText: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
        marginTop: 50,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    removeButton: {
        backgroundColor: "#FF0000",
        padding: 10,
        borderRadius: 5,
    },
    removeButtonText: {
        color: "#fff",
        fontWeight: "bold",
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