import { ProductCard } from "@/components/ProductCard";
import useProducts from "@/hooks/useProducts";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "@/components/CartContext";
import { IProductCard } from "@/interfaces/product-card";
import { useUser } from "@/components/UserContext";

const home = () => {
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { logout } = useUser();
    const router = useRouter();

    const handleAddToCart = (product: IProductCard) => {
        addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
        router.push("/shopping-cart");
    };

    const handleLogout = async () => {
        try {
            logout();
            router.replace("/login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    if (products.length === 0) {
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity
                        style={style.logoutButton}
                        onPress={handleLogout}
                    >
                        <Text style={style.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                    <Text style={style.title}>
                        Seu outlet de HotWheels barato!
                    </Text>
                </View>
                <Text style={style.subtitle}>
                    Sem itens cadastrados para o momento
                </Text>
            </View>
        );
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <TouchableOpacity
                    style={style.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={style.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
                <Text style={style.title}>Seu outlet de HotWheels barato!</Text>
            </View>
            <Text style={style.subtitle}>Confira nosso catálogo abaixo:</Text>
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    {...product}
                    onAddToCart={() => handleAddToCart(product)}
                />
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
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "#CE3E2F",
        padding: 10,
        borderRadius: 5,
        alignSelf: "flex-end",
    },
    logoutButtonText: {
        fontSize: 16,
        color: "#fff",
    },
});
