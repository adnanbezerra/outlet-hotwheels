import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const welcome = () => {
    const router = useRouter();

    return (
        <LinearGradient
            colors={["#F8DA2F", "#CE3E2F"]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.textContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={styles.logo}
                    ></Image>
                    <Text style={styles.title}>Outlet Hotwheels</Text>
                    <Text style={styles.subtitle}>
                        Acelerando a sua coleção
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.replace("/login")}
                    style={styles.loginButton}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => router.replace("/register")}
                >
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
    logo: {
        width: 200,
        height: 100,
    },
});

export default welcome;
