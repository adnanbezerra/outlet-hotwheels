import { ProductCard } from "@/components/ProductCard";
import useProducts from "@/hooks/useProducts";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "@/components/CartContext";
import { IProductCard } from "@/interfaces/product-card";

const home = () => {
    const { products } = useProducts();
    const { addToCart } = useCart();
    
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

    if (products.length === 0) {
        return (
            <View style={style.container}>
                <View style={style.header}>
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
