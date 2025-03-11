import { ProductCard } from "@/components/ProductCard";
import { StyleSheet, Text, View } from "react-native";

const home = () => {
    return (
        <View style={style.container}>
            <Text style={style.title}>Seu outlet de HotWheels barato!</Text>
            <Text style={style.subtitle}>Confira nosso catálogo abaixo:</Text>
            <ProductCard
                title="Product 1"
                price="10,00"
                description="Description 1"
                image="https://images.tcdn.com.br/img/img_prod/639703/carrinhos_basicos_hot_wheels_mattel_ref_c4982_4897_2_20200331171200.jpg"
            />
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
    }
});
