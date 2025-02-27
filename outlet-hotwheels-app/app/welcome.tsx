import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const welcome = () => {
    return (
        <LinearGradient
            colors={["#1D3D47", "#A1CEDC"]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.textContainer}>
                <View style={styles.logoContainer}>
                    <AntDesign name="bank" size={100} color="#fff" />
                    <Text style={styles.title}>E-commerce IA</Text>
                    <Text style={styles.subtitle}>Sua loja virtual inteligente</Text>
                </View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        alignItems: "center",
    },
    logoContainer: {
        marginBottom: 24,
        alignItems: "center",
    },
    loginButton: {
        backgroundColor: "#fff",
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: "#fff",
        color: "#1D3D47",
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        color: "#fff",
        fontSize: 32,
    },
    subtitle: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 24,
    },
});

export default welcome;
