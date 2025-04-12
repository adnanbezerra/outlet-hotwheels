import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { CartItem, useCart } from "@/components/CartContext";
import { formatPrice } from "@/shared/format-price";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/constants/api";

const shoppingCart = () => {
    const { cart, removeFromCart, setCart } = useCart(); // Use o estado global do carrinho
    const router = useRouter();

    const fetchCartItems = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_URL}/cart`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data: any = await response.json();

            if (typeof data.message === "string") {
                setCart({ items: [] });
                throw new Error("Erro ao buscar os itens do carrinho");
            } else setCart(data);
        } catch (error) {
            console.error("Erro ao buscar os itens do carrinho:", error);
        }
    };

    // Busca os itens do carrinho ao montar o componente
    useEffect(() => {
        fetchCartItems();
    }, []);

    const renderItem = ({ item }: { item: any }) => {
        console.log({item});
        

        return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.productId?.name || item.name}</Text>
            <Text style={styles.itemPrice}>{formatPrice(item.productId?.price || item.price)}</Text>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.productId?._id || item._id)}
            >
                <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
        </View>
    )};

    if (cart.items.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Seu carrinho está vazio.
                    </Text>
                    <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={() => router.replace("/home")}
                    >
                        <Text style={styles.checkoutButtonText}>
                            Voltar para tela inicial
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {cart.items.length > 0 && (
                <FlatList
                    data={cart.items}
                    renderItem={renderItem}
                    keyExtractor={(item, index) =>
                        item?._id ? item._id.toString() : `key-${index}`
                    }
                />
            )}
            {cart.items.length > 0 && (
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => router.replace("/checkout")}
                >
                    <Text style={styles.checkoutButtonText}>
                        Finalizar Compra
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        color: "#000",
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
        color: "#000",
    },
    itemPrice: {
        fontSize: 18,
        color: "#000",
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

export default shoppingCart;
