import { ProductCard } from "@/components/ProductCard";
import useProducts from "@/hooks/useProducts";
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { useRouter } from "expo-router"; 
import { Ionicons } from "@expo/vector-icons";

const home = () => {
    const { products } = useProducts();
    const router = useRouter(); 

    return (
        <View style={style.container}>
            <View style={style.header}>
            <Text style={style.title}>Seu outlet de HotWheels barato!</Text>
            <TouchableOpacity
                    style={style.cartButton}
                    onPress={() => router.push("/shoppingCart")}
                >
                    <Ionicons name="cart" size={24} color="#fff" />
                </TouchableOpacity>
                </View>
            <Text style={style.subtitle}>Confira nosso catálogo abaixo:</Text>
            {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </View>
    );
};

export default home;

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cartButton: {
        backgroundColor: "#CE3E2F",
        padding: 10,
        borderRadius: 5,
    },
    cartButtonText: {
        fontSize: 16,
        color: "#fff",
    },
});
