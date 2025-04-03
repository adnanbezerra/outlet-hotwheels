import { useCart } from "@/components/CartContext";
import useProducts from "@/hooks/useProducts";
import { formatPrice } from "@/shared/format-price";
import { renderStars } from "@/shared/render-stars";
import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProductPage() {
    const route = useRoute();
    const { id }: any = route.params;

    const { products } = useProducts();

    const product = products.find((item) => item._id === +id);

    if (!product) {
        return (
            <View style={style.container}>
                <Text>Produto não encontrado</Text>
            </View>
        );
    }

    return (
        <View style={style.container}>
            <View style={{ flexDirection: "row" }}>
                <View style={style.leftSide}>
                    <Text style={style.title}>{product.name}</Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ marginRight: 5, color: "#3483FA" }}>
                            {product.stars}
                        </Text>
                        {renderStars(product.stars)}
                    </View>
                    <Text style={style.price}>
                        {formatPrice(product.price)}
                    </Text>
                    <Text style={style.frete}>Frete grátis</Text>
                </View>
                <View style={style.rightSide}>
                    <Image
                        source={{
                            uri: product.image
                                ? `data:${product.image?.contentType};base64,${product.image?.base64Image}`
                                : "./caixa.png",
                        }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                    />
                    <Text style={style.descriptionTitle}>
                        Descrição do produto:
                    </Text>
                    <Text style={style.description}>{product.description}</Text>
                </View>
            </View>

            <TouchableOpacity style={style.button}>
                <Text style={style.buttonText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    leftSide: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: 200,
        gap: 10,
    },
    rightSide: {
        flex: 1,
        flexDirection: "column",
    },
    price: {
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 10,
    },
    frete: {
        color: "#00A884",
        marginTop: 5,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    descriptionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    button: {
        backgroundColor: "#00A884",
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
    },
});
