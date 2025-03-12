import { IProductCard, ProductCard } from "@/components/ProductCard";
import useProducts from "@/hooks/useProducts";
import { StyleSheet, Text, View } from "react-native";

const home = () => {
    const { products } = useProducts();

    return (
        <View style={style.container}>
            <Text style={style.title}>Seu outlet de HotWheels barato!</Text>
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
});
