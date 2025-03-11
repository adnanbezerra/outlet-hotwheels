import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";

export function ProductCard({ title, price, description, image }: any) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text>R${price}</Text>
                <Text>{description}</Text>
            </View>
            <View>
                <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        height: "auto",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        maxHeight: 150,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
